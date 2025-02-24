from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    about_me = db.Column(db.String(255))
    street_address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    zip_code = db.Column(db.String(255))
    birthdate = db.Column(db.String(255))


class AdminConfig(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    page2_components = db.Column(db.String(255))
    page3_components = db.Column(db.String(255))