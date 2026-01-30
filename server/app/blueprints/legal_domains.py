from datetime import datetime, timezone   # ← Add this import at top of file
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity   # ← Add this import at the top
from app import db
from app.models.legal_domain import LegalDomain
import re

def generate_slug(title):
    """Generate URL-friendly slug from title"""
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', title).strip().lower()
    slug = re.sub(r'\s+', '-', slug)
    return slug

legal_domains_bp = Blueprint('legal_domains', __name__)

@legal_domains_bp.route('/', methods=['GET'])
@jwt_required()   # ← Add this
def get_legal_domains():
    from app import db
    from app.models.legal_domain import LegalDomain
    from flask_jwt_extended import get_jwt_identity, jwt_required   # ← add this import if using JWT

    # Optional: @jwt_required() if you want to require login
    current_user_id = None
    try:
        current_user_id = get_jwt_identity()   # works if using Flask-JWT-Extended
    except:
        pass

    # print(f"DEBUG: current_user_id = {current_user_id} (type: {type(current_user_id)})")

    query = LegalDomain.query.filter(
        (LegalDomain.is_standard == True) |
        (LegalDomain.user_id == current_user_id)
    )

    is_standard_param = request.args.get('is_standard')
    if is_standard_param is not None:
        query = query.filter(LegalDomain.is_standard == (is_standard_param.lower() == 'true'))

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

# ─────────────────────────────────────────────────────────────
# POST /api/legal-domains/  → Create custom domain
# ─────────────────────────────────────────────────────────────
@legal_domains_bp.route('/', methods=['POST'])
@jwt_required()
def create_legal_domain():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        title = data.get('title', '').strip()
        if not title:
            return jsonify({'error': 'Title is required'}), 400

        # Check for duplicate title
        if LegalDomain.query.filter_by(title=title).first():
            return jsonify({'error': 'A legal domain with this title already exists'}), 409

        slug = generate_slug(title)

        # Check for duplicate slug (rare but possible)
        if LegalDomain.query.filter_by(slug=slug).first():
            # Add simple counter if slug exists
            counter = 1
            while LegalDomain.query.filter_by(slug=f"{slug}-{counter}").first():
                counter += 1
            slug = f"{slug}-{counter}"
            
        from flask_jwt_extended import get_jwt_identity, jwt_required

        current_user_id = get_jwt_identity()   # ← Now safe

        new_domain = LegalDomain(
            title=title,
            description=data.get('description', '').strip() or '',
            slug=slug,
            icon_name=data.get('icon_name', 'Scale'),
            color=data.get('color', 'blue'),
            regulation_count=0,
            is_standard=False,
            user_id=current_user_id,           # ← Now sets the user
            created_at=datetime.now(timezone.utc),      # ← Fixed
            updated_at=datetime.now(timezone.utc)       # ← Fixed
        )

        db.session.add(new_domain)
        db.session.commit()


        return jsonify(new_domain.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    

@legal_domains_bp.route('/<int:domain_id>', methods=['DELETE'])
@jwt_required()
def delete_legal_domain(domain_id):
    try:
        current_user_id = get_jwt_identity()
        domain = LegalDomain.query.get(domain_id)

        if not domain:
            return jsonify({'error': 'Domain not found'}), 404

        # Security checks
        if domain.is_standard:
            return jsonify({'error': 'Cannot delete standard domains'}), 403

        if domain.user_id != current_user_id:
            return jsonify({'error': 'You can only delete your own domains'}), 403

        db.session.delete(domain)
        db.session.commit()

        return jsonify({'message': 'Domain deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@legal_domains_bp.route('/<int:domain_id>', methods=['PUT'])
@jwt_required()
def update_legal_domain(domain_id):
    try:
        current_user_id = get_jwt_identity()
        domain = LegalDomain.query.get(domain_id)

        if not domain:
            return jsonify({'error': 'Domain not found'}), 404

        # Security checks
        if domain.is_standard:
            return jsonify({'error': 'Cannot edit standard domains'}), 403

        if domain.user_id != current_user_id:
            return jsonify({'error': 'You can only edit your own domains'}), 403

        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Update fields
        if 'title' in data and data['title'].strip():
            new_title = data['title'].strip()
            
            # Check for duplicate title (exclude current domain)
            existing = LegalDomain.query.filter(
                LegalDomain.title == new_title,
                LegalDomain.id != domain_id
            ).first()
            
            if existing:
                return jsonify({'error': 'A domain with this title already exists'}), 409

            domain.title = new_title
            domain.slug = generate_slug(new_title)

        if 'description' in data:
            domain.description = data['description'].strip() or ''

        if 'icon_name' in data and data['icon_name']:
            domain.icon_name = data['icon_name']

        if 'color' in data and data['color']:
            domain.color = data['color']

        domain.updated_at = datetime.now(timezone.utc)

        db.session.commit()

        return jsonify(domain.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500