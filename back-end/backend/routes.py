from backend.models import User
from backend import db, app
from secrets import token_hex

from flask import request, abort, jsonify

t = ""

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