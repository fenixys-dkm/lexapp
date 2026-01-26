from unicodedata import name
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
# from werkzeug.exceptions import BadRequest

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return jsonify({'message': 'Logged in', 'token': 'fake-jwt-token'}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    # Lazy imports inside the function to avoid circular import issues
    from app import db
    from app.models.user import User

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    name = data.get('name')
    email = data.get('email')
    company = data.get('company')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({'error': 'Name, email and password are required'}), 400

    if User.query.filter_by(email=email).first():
         return jsonify({'error': 'Email already registered'}), 400

    # Print to terminal (development only!)
    print("Comitting new user registration:")
    print(f"Name     : {name}")
    print(f"Company  : {company or 'Not provided'}")
    print(f"Email    : {email}")
    
    user = User(name=name, email=email, company=company)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Account created successfully'}), 201
