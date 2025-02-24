from flask import Flask
from flask_cors import CORS
from models import db, AdminConfig


app = Flask(__name__)
CORS(app)

# Configure SQLite for simplicity.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///zealthy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()
    if not AdminConfig.query.first():
        config = AdminConfig(
            page2_components = 'about_me,address',
            page3_components='birthdate'
        )
        db.session.add(config)
        db.session.commit()

#registering the routes
import routes
routes.register_routes(app)

if __name__ == '__main__':
    app.run(debug = True)