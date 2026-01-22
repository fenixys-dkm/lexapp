import os
from pathlib import Path

basedir = Path(__file__).resolve().parent.parent.parent

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-me'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + str(basedir / 'dev.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
