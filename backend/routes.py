from flask import request, jsonify
from models import db, User, AdminConfig

def register_routes(app):
    @app.route("/api/user", methods=["POST"])
    def create_user():
        data = request.json
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        existing_user = User.query.filter_by(email=email).first()

        if existing_user and existing_user.password != password:
            return jsonify({'error': 'Incorrect password for the Email'}), 401
        # print("Existing user deatils are: ", existing_user.about_me)
        if existing_user:
            return jsonify({
                'user_id': existing_user.id,
                'email': existing_user.email,
                'about_me': existing_user.about_me,
                'street_address': existing_user.street_address,
                'city' : existing_user.city,
                'state' : existing_user.state,
                'zip_code' : existing_user.zip_code,
                'birthdate': existing_user.birthdate,

            })
        user = User(
            email = data.get('email'),
            password = data.get('password'),
            # about_me = data.get('about_me'),
            # street_address = data.get('street_address'),
            # city = data.get('city'),
            # state = data.get('state'),
            # zip_code = data.get('zip_code'),
            # birthdate = data.get('birthdate')
        )

        db.session.add(user)
        db.session.commit()
        user = User.query.filter_by(email=email).first()
        return jsonify({
            'user_id': user.id,
            'email': user.email,
        }), 201
    
    @app.route('/api/user/<int:user_id>', methods=['PATCH'])
    def update_user(user_id):
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.json
        user.about_me = data.get('about_me', user.about_me)
        user.street_address = data.get('street_address', user.street_address)
        user.city = data.get('city', user.city)
        user.state = data.get('state', user.state)
        user.zip_code = data.get('zip_code', user.zip_code)
        user.birthdate = data.get('birthdate', user.birthdate)

        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    
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
    @app.route("/api/config", methods=['GET', 'PATCH'])
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