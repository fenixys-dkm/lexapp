import os
from pathlib import Path
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

basedir = Path(__file__).resolve().parent.parent.parent

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-me'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + str(basedir / 'dev.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT settings
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-super-secret-change-me-in-production'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_TOKEN_LOCATION = ['headers']