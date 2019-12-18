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

def temp():
    for p in products:
        db.session.add(p)
    db.session.commit()

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
    else:
        print('Login unsuccessful')
    return jsonify({
        'status': 'OK',
        'message': "Successfully logged in user!",
        'token': t
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
    temp()
    prod_list = Product.query.all()
    for p in prod_list:
        return_list.append(p.to_dict())
    return jsonify(return_list)

@app.route('/home/cart', methods=['GET', 'POST'])
def pid():
    product_id = request.json.get('product_id', None)
    cart_item = Product.query.get(product_id)
    for prod in Product.query.all():
        if current_user not in prod.in_cart_of:
            cart_item.in_cart_of.append(current_user)
            db.session.commit()            
    return jsonify({'added_to_cart': True})

@app.route('/cart', methods=['GET', 'POST'])
def cart():
    cart_of_user = []
    for prod in Product.query.all():
        if current_user in prod.in_cart_of:
            cart_of_user.append(prod.to_dict())
    return jsonify({'cart_of_user': cart_of_user})