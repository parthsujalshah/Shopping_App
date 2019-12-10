from backend import db, app

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    cart_items = db.relationship('Product', backref='user_cart', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_file = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(20), nullable=False)
    company = db.Column(db.String(20), nullable=False)
    price = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=False)
    consumer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'image_file': self.image_file,
            'name': self.name,
            'company': self.company,
            'price': self.price,
            'description': self.description,
            'consumer_id': self.consumer_id
        }

    def __repr__(self):
        return f"Product('{self.name}', '{self.company}', '{self.price}', '{self.description}')"