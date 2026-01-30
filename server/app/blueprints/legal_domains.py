from flask import Blueprint, jsonify, request

legal_domains_bp = Blueprint('legal_domains', __name__)

@legal_domains_bp.route('/', methods=['GET'])
def get_legal_domains():
    from app import db
    from app.models.legal_domain import LegalDomain

    # Optional query param: ?is_standard=true
    is_standard_param = request.args.get('is_standard')
    query = LegalDomain.query

    if is_standard_param is not None:
        is_std = is_standard_param.lower() == 'true'
        query = query.filter_by(is_standard=is_std)

    domains = query.order_by(LegalDomain.title).all()
    return jsonify([domain.to_dict() for domain in domains]), 200


@legal_domains_bp.route('/<int:domain_id>', methods=['GET'])
def get_legal_domain(domain_id):
    from app import db
    from app.models.legal_domain import LegalDomain

    domain = LegalDomain.query.get(domain_id)
    if not domain:
        return jsonify({'error': 'Legal domain not found'}), 404
    return jsonify(domain.to_dict()), 200


# Optional: by slug (useful for URLs)
@legal_domains_bp.route('/slug/<string:slug>', methods=['GET'])
def get_legal_domain_by_slug(slug):
    from app import db
    from app.models.legal_domain import LegalDomain

    domain = LegalDomain.query.filter_by(slug=slug).first()
    if not domain:
        return jsonify({'error': 'Legal domain not found'}), 404
    return jsonify(domain.to_dict()), 200