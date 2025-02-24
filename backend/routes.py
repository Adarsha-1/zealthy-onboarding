from flask import request, jsonify
from models import db, User, AdminConfig

def register_routes(app):
    @app.route("/api/user", methods=["POST"])
    def create_user():
        data = request.json
        user = User(
            email = data.get('email'),
            password = data.get('password'),
            about_me = data.get('about_me'),
            street_address = data.get('street_address'),
            city = data.get('city'),
            state = data.get('state'),
            zip_code = data.get('zip_code'),
            birthdate = data.get('birthdate')
        )

        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "user created sucessfully"}), 201
    
    # function to return all users
    @app.route("/api/users", methods=["GET"])
    def get_users():
        users = User.query.all()
        users_list = []
        for u in users:
            users_list.append({
                'email': u.email,
                'about_me': u.about_me,
                'street_address': u.street_address,
                'city' : u.city,
                'state' : u.state,
                'zip_code' : u.zip_code,
                'birthdate': u.birthdate,
            })

        return jsonify(users_list)
    
    # function for getting and updating admin config
    @app.route("/api/config", methods=['GET', 'POST'])
    def adminConfig():
        if request.method == 'GET':
            config  = AdminConfig.query.first()
            return jsonify({
                'page2': config.page2_components.split(',') if config.page2_components else [],
                'page3': config.page3_components.split(',') if config.page3_components else []
            })
        else:
            data = request.json
            config = AdminConfig.query.first()
            config.page2_components = ','.join(data.get('page2', []))
            config.page3_components = ','.join(data.get('page3', []))
            db.session.commit()
            return jsonify({'message': 'Configuration updated successfully'})