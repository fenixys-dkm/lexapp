from flask import Flask, app
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate  # New import

# Import blueprints
from .blueprints.auth import auth_bp
from .blueprints.users import users_bp
from .blueprints.products import products_bp


db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()  # New: Initialize Migrate

def create_app(config_class='app.config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)  # New: Bind Migrate to app and db

    from .models import User

    # with app.app_context():
    #     from .models.user import User   # Register model
    #     db.create_all()

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(products_bp, url_prefix='/api/products')

    @app.route('/api/health')
    def health():
        return {'status': 'ok'}, 200

    return app
