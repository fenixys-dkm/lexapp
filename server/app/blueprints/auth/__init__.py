from flask import Blueprint, jsonify, request

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return jsonify({'message': 'Logged in', 'token': 'fake-jwt-token'}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    return jsonify({'message': 'User registered'}), 201
