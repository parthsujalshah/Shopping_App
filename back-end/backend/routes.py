from backend.models import User, Product
from backend import db, app
from secrets import token_hex
import base64
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

from flask import request, abort, jsonify

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

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'message': 'Token is Invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/register', methods=['GET','POST'])
def register():
    username = request.json.get('username', None)    
    email = request.json.get('email', None)   
    password = request.json.get('password', None)
    hashed_password = generate_password_hash(request.json.get('password', None))
    user = User(username=username, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': "Successfully registered user!"})

@app.route('/login', methods=['GET', 'POST'])
def login():
    if not request.json.get('username') or not request.json.get('password'):
        return jsonify({'message': 'Could not verify'})
    user = User.query.filter_by(username=request.json.get('username')).first()

    if not user:
        return jsonify({'message': 'Could not verify'})
    if check_password_hash(user.password, request.json.get('password')):
        token = jwt.encode(
            {
                'user_id': user.id,
                'username': user.username,
            },
            app.config['SECRET_KEY']
        )
        return jsonify({'token': token.decode('UTF-8')})
    return jsonify({'message': 'Could not verify'})

@app.route('/logout', methods=['GET', 'POST'])
@token_required
def logout(current_user):
    return jsonify({'logged_in': False})

@app.route('/home', methods=['GET', 'POST'])
@token_required
def home(current_user):
    return_list = []
    for product in products:
        db.session.add(product)
    db.session.commit()
    prod_list = Product.query.all()
    for p in prod_list:
        return_list.append(p.to_dict())
    return jsonify(return_list)

@app.route('/home/cart', methods=['GET', 'POST'])
@token_required
def pid(current_user):
    product_id = request.json.get('product_id', None)
    cart_item = Product.query.get(product_id)
    if current_user not in cart_item.in_cart_of:
        cart_item.in_cart_of.append(current_user)
        db.session.commit()
    return jsonify({'added_to_cart': True})

@app.route('/cart', methods=['GET', 'POST'])
@token_required
def cart(current_user):
    cart_of_user = []
    for prod in Product.query.all():
        if current_user in prod.in_cart_of:
            cart_of_user.append(prod.to_dict())
    return jsonify({'cart_of_user': cart_of_user})

@app.route('/upload', methods=['GET', 'POST'])
@token_required
def upload(current_user):
    image_file = request.json.get('image_file', None)
    name = request.json.get('name', None)
    company = request.json.get('company', None)
    price = request.json.get('price', None)
    description = request.json.get('description', None)
    if image_file and name and company and price and description:
        uploaded_by = current_user
        return jsonify({'uploaded': True})
    else:
        return jsonify({'uploaded': False})