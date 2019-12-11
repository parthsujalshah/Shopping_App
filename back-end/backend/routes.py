from backend.models import User, Product # image_file commented in Product in models
from backend import db, app
from secrets import token_hex
import base64

from flask import request, abort, jsonify

t = ""
current_user = None

with open("C:\\Users\\Lenovo\\Documents\\Projects\\AppDevelopment\\Shopping_App\\back-end\\backend\\static\\images\\test.jpg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

products = [
    Product(
        image_file = str(encoded_string), 
        name = 'item1', 
        company = 'xyz', 
        price = '$30', 
        description = 'Lorem Ipsum'
    ),
    Product(
        image_file = str(encoded_string), 
        name = 'item2', 
        company = 'xyz', 
        price = '$30', 
        description = 'Lorem Ipsum'
    ),
    Product(
        image_file = str(encoded_string), 
        name = 'item3', 
        company = 'xyz', 
        price = '$30', 
        description = 'Lorem Ipsum'
    ),
    Product(
        image_file = str(encoded_string), 
        name = 'item4', 
        company = 'xyz', 
        price = '$30', 
        description = 'Lorem Ipsum'
    ),
]


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
        global current_user
        current_user = user
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
    global current_user
    current_user = None
    return jsonify({'logged_in': False})

@app.route('/home', methods=['GET', 'POST'])
def home():
    return_list = []
    for p in products:
        if Product.query.filter_by(name=p.name).first():
            print('Already added')
        else:
            db.session.add(p)
            db.session.commit()
        return_list.append(p.to_dict())
        print(p.to_dict())
        # print(return_list)
    return jsonify(return_list)

@app.route('/home/cart', methods=['GET', 'POST'])
def pid():
    product_id = request.json.get('product_id', None)
    cart_item = Product.query.get(product_id)
    cart_item.user_cart = current_user
    return jsonify({'added_to_cart': True})

@app.route('/test', methods=['GET', 'POST'])
def test():
    p = Product(
        image_file = 'str(encoded_string)', 
        name = 'item1', 
        company = 'xyz', 
        price = '$30', 
        description = 'Lorem Ipsum'
    )
    db.session.add(p)
    db.session.commit()
    p = Product.query.get(1)
    return jsonify(p.to_dict())