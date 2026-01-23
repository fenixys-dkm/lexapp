import os
from pathlib import Path
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

basedir = Path(__file__).resolve().parent.parent.parent


db = SQLAlchemy()
jwt = JWTManager()


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-me'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + str(basedir / 'dev.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
