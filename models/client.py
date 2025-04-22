from models.db import db

class Client(db.Model):
    __tablename__ = 'clients'

    id_client = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(30), nullable=False)
    phone = db.Column(db.String(10), nullable=False)
    address = db.Column(db.String(100), nullable=False)

    vehicles = db.relationship('Vehicle', backref='client', lazy=True, cascade="all, delete-orphan")
    repairs = db.relationship('Repair', back_populates='client', lazy=True, cascade="all, delete-orphan")

    def serialize(self):
        return {
            'id_client': self.id_client,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            'vehicles': [vehicle.serialize() for vehicle in self.vehicles]
        }
