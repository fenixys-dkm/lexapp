from flask import Flask
from flask_cors import CORS

# Import blueprints
from .blueprints.auth import auth_bp
from .blueprints.users import users_bp
from .blueprints.products import products_bp

def create_app(config_class='app.config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(products_bp, url_prefix='/api/products')

    @app.route('/api/health')
    def health():
        return {'status': 'ok'}, 200

    return app
