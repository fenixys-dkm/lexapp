from flask import Flask # Flask application
from flask_cors import CORS # Enable CORS
from flask_sqlalchemy import SQLAlchemy # Database ORM
from flask_jwt_extended import JWTManager # JWT for authentication
from flask_migrate import Migrate # Database migration tool
import os
from sqlalchemy import inspect


db = SQLAlchemy() # Initialize SQLAlchemy
jwt = JWTManager() # Initialize JWTManager
migrate = Migrate()  # New: Initialize Migrate

def create_app(config_class='app.config.Config'): # Application factory
    app = Flask(__name__) # Create Flask app instance
    app.config.from_object(config_class) # Load configuration

# Replace this:
# CORS(app) # Enable CORS for all routes


    CORS(
        app,
        origins=os.environ.get("CORS_ORIGINS", "http://localhost:5173").split(","),
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    db.init_app(app) # Bind SQLAlchemy to app
    jwt.init_app(app) # Bind JWTManager to app
    migrate.init_app(app, db)  # Bind Migrate to app and db

    # Import and register blueprints (inside function = safer)
    from .blueprints.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')# Register auth blueprint

    # Inside create_app(), replace the seeding part with:
    with app.app_context():
        from .models import User
        from .models.legal_domain import LegalDomain, seed_standard_domains

        # Only try to seed if the table actually exists
        inspector = inspect(db.engine)
        if 'legal_domain' in inspector.get_table_names():
            if not LegalDomain.query.first():
                print("🌱 Seeding standard legal domains...")
                seed_standard_domains()
            else:
                # Optional: check for missing standards
                existing_slugs = {d.slug for d in LegalDomain.query.filter_by(is_standard=True).all()}
                if len(existing_slugs) < 6:
                    print("🌱 Some standard domains missing — re-seeding...")
                    seed_standard_domains()
        else:
            print("ℹ️  legal_domain table does not exist yet. Run 'flask db upgrade' first.")

    return app
