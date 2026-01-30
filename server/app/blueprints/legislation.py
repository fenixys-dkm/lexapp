# server/app/blueprints/legislation.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from requests.exceptions import RequestException, Timeout, ConnectionError, HTTPError
from datetime import datetime, timedelta
import json

legislation_bp = Blueprint('legislation', __name__)

# In-memory cache
_cache = {
    "data": None,
    "timestamp": None,
    "ttl_seconds": 30 * 60   # 30 minutes
}

def is_cache_valid():
    if _cache["data"] is None or _cache["timestamp"] is None:
        return False
    age = (datetime.utcnow() - _cache["timestamp"]).total_seconds()
    return age < _cache["ttl_seconds"]

@legislation_bp.route('/nal-list', methods=['GET'])
@jwt_required(optional=True)
def get_nal_list():
    # Support cache refresh via query param
    force_refresh = request.args.get('refresh', 'false').lower() in ['true', '1', 'yes']

    # Return cached data if valid and not forced refresh
    if not force_refresh and is_cache_valid():
        return jsonify({
            "success": True,
            "count": len(_cache["data"]) if isinstance(_cache["data"], list) else len(_cache["data"].get("results", [])),
            "data": _cache["data"],
            "source": "cache",
            "cached_at": _cache["timestamp"].isoformat(),
            "expires_in": int(_cache["ttl_seconds"] - (datetime.utcnow() - _cache["timestamp"]).total_seconds())
        })

    # Fetch fresh data
    url = "http://publications.europa.eu/webapi/nal/list"
    
    retry_strategy = Retry(total=4, backoff_factor=1.5, status_forcelist=[429, 500, 502, 503, 504])
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session = requests.Session()
    session.mount("http://", adapter)
    session.mount("https://", adapter)

    try:
        response = session.get(url, timeout=45)
        response.raise_for_status()
        data = response.json()

        # Store in cache
        _cache["data"] = data
        _cache["timestamp"] = datetime.utcnow()

        count = len(data) if isinstance(data, list) else len(data.get("results", []))
        
        return jsonify({
            "success": True,
            "count": count,
            "data": data,
            "source": "fresh",
            "cached_at": _cache["timestamp"].isoformat()
        })

    except Exception as e:
        # If cache exists, return stale data with warning
        if _cache["data"] is not None:
            count = len(_cache["data"]) if isinstance(_cache["data"], list) else len(_cache["data"].get("results", []))
            return jsonify({
                "success": True,
                "count": count,
                "data": _cache["data"],
                "source": "stale_cache",
                "warning": f"Failed to refresh: {str(e)}",
                "cached_at": _cache["timestamp"].isoformat()
            }), 200
        else:
            return jsonify({"error": f"Failed to fetch NAL list: {str(e)}"}), 500
    finally:
        session.close()



@legislation_bp.route('/sparql', methods=['POST'])
@jwt_required(optional=True)
def execute_sparql():
    try:
        data = request.get_json()
        sparql_query = data.get('query')

        if not sparql_query:
            return jsonify({"error": "Missing SPARQL query in body"}), 400

        url = "http://publications.europa.eu/webapi/rdf/sparql"

        headers = {
            "Content-Type": "application/sparql-query",
            "Accept": "application/sparql-results+json",   # ← Changed to JSON
            "User-Agent": "LexApp/1.0"
        }

        response = requests.post(url, data=sparql_query, headers=headers, timeout=30)
        response.raise_for_status()

        result_json = response.json()

        # Standard SPARQL JSON structure: { "head": { "vars": [...] }, "results": { "bindings": [...] } }
        bindings = result_json.get("results", {}).get("bindings", [])

        # Convert bindings to simple list of dicts
        clean_results = []
        for binding in bindings:
            row = {}
            for var, value_obj in binding.items():
                row[var] = value_obj.get("value", "")
            clean_results.append(row)

        return jsonify({
            "success": True,
            "count": len(clean_results),
            "results": clean_results,
            "head": result_json.get("head", {}),
            "raw": result_json  # optional: full raw response
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500