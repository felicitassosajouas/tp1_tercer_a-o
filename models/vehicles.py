from models.db import db

class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    id_vehicle = db.Column(db.Integer, primary_key=True, autoincrement=True)
    brand = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    patente = db.Column(db.String(10), nullable=False)
    year_vehicles = db.Column(db.Integer, nullable=False)
    cost = db.Column(db.Float, nullable=False)
    id_client = db.Column(db.Integer, db.ForeignKey('clients.id_client'), nullable=False)

    repairs = db.relationship('Repair', back_populates='vehicle', cascade="all, delete-orphan", lazy=True)

    def serialize(self):
        return {
            'id_vehicle': self.id_vehicle,
            'brand': self.brand,
            'model': self.model,
            'patente': self.patente,
            'year_vehicles': self.year_vehicles,
            'cost': self.cost,
            'id_client': self.id_client,
            'repairs': [repair.serialize() for repair in self.repairs]
        }
