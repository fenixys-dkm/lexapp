# server/app/blueprints/legislation.py
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required  # optional
import requests                               # ← Import requests library

legislation_bp = Blueprint('legislation', __name__)

@legislation_bp.route('/nal-list', methods=['GET'])
@jwt_required()   # optional: require login or not
def get_nal_list():
    try:
        url = "http://publications.europa.eu/webapi/nal/list"
        response = requests.get(url, timeout=60)
        response.raise_for_status()

        data = response.json()
        return jsonify({
            "success": True,
            "count": len(data.get("results", [])) if isinstance(data, dict) else len(data),
            "data": data
        })
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to fetch NAL list: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500