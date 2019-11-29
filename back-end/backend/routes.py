from backend.models import User, Product # image_file commented in Product in models
from backend import db, app
from secrets import token_hex
import base64

from flask import request, abort, jsonify

t = ""
with open("C:\\Users\\Lenovo\\Documents\\Projects\\AppDevelopment\\Shopping_App\\back-end\\backend\\static\\images\\test.jpg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())


@app.route('/register', methods=['GET','POST'])
def register():
    username = request.json.get('username', None)   
    email = request.json.get('email', None)   
    password = request.json.get('password', None)
    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({
        'status': 'OK',
        'message': "Successfully registered user!"
    })

@app.route('/login', methods=['GET', 'POST'])
def login():
    email = request.json.get('email', None)   
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email).first()
    if user and user.password==password: 
        global t
        t = token_hex(16)
        return jsonify({
            'token': t
        })
    else:
        print('Login unsuccessful')
    return jsonify({
        'status': 'OK',
        'message': "Successfully logged in user!"
    })

@app.route('/login-check', methods=['GET', 'POST'])
def check_user():
    token = request.json.get('Token', None)
    return jsonify({'logged_in': True}) if token == t else jsonify({'logged_in': False})

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    global t
    t = ""
    return jsonify({'logged_in': False})

@app.route('/home', methods=['GET', 'POST'])
def home():
    return jsonify([
        {
            'image': str(encoded_string),
            'name': 'item4',
            'company': 'xyz',
            'price': '$30',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            'image': str(encoded_string),
            'name': 'item4',
            'company': 'xyz',
            'price': '$30',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            'image': str(encoded_string),
            'name': 'item4',
            'company': 'xyz',
            'price': '$30',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            'image': str(encoded_string),
            'name': 'item4',
            'company': 'xyz',
            'price': '$30',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ])