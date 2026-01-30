# app/blueprints/__init__.py
from .auth import auth_bp
from .legal_domains import legal_domains_bp
from .legislation import legislation_bp

__all__ = ['auth_bp',
           'legal_domains_bp',
           'legislation_bp']