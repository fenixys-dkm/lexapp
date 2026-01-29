from flask import Flask # Flask application
from flask_cors import CORS # Enable CORS
from flask_sqlalchemy import SQLAlchemy # Database ORM
from flask_jwt_extended import JWTManager # JWT for authentication
from flask_migrate import Migrate # Database migration tool




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

    # Import and register blueprints (inside function = safer)
    from .blueprints.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')# Register auth blueprint

    # Import all models (important for Flask-Migrate to detect them)
    with app.app_context():
        from .models import User


    return app
