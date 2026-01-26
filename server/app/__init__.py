from flask import Flask, app # Flask application
from flask_cors import CORS # Enable CORS
from flask_sqlalchemy import SQLAlchemy # Database ORM
from flask_jwt_extended import JWTManager # JWT for authentication
from flask_migrate import Migrate # Database migration tool

# Import blueprints
from .blueprints.auth import auth_bp
from .blueprints.users import users_bp


db = SQLAlchemy() # Initialize SQLAlchemy
jwt = JWTManager() # Initialize JWTManager
migrate = Migrate()  # New: Initialize Migrate

def create_app(config_class='app.config.Config'): # Application factory
    app = Flask(__name__) # Create Flask app instance
    app.config.from_object(config_class) # Load configuration

    CORS(app) # Enable CORS for all routes

    db.init_app(app) # Bind SQLAlchemy to app
    jwt.init_app(app) # Bind JWTManager to app
    migrate.init_app(app, db)  # Bind Migrate to app and db

    from .models import User # Ensure models are imported for migrations

    app.register_blueprint(auth_bp, url_prefix='/api/auth') # Register auth blueprint
    app.register_blueprint(users_bp, url_prefix='/api/users') # Register users blueprint

    return app
