from models.db import db

class Repair(db.Model):
    __tablename__ = 'repairs'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_vehicle = db.Column(db.Integer, db.ForeignKey('vehicles.id_vehicle'), nullable=False)
    id_client = db.Column(db.Integer, db.ForeignKey('clients.id_client'), nullable=False)
    date_repair = db.Column(db.Date, nullable=False)
    description_repair = db.Column(db.String(200), nullable=False)
    work_done = db.Column(db.String(100), nullable=False)
    cost = db.Column(db.Float(precision=10), nullable=False)

    vehicle = db.relationship('Vehicle', back_populates='repairs')
    client = db.relationship('Client', back_populates='repairs')

    def serialize(self):
        return {
            'id': self.id,
            'id_vehicle': self.id_vehicle,
            'id_client': self.id_client,
            'date_repair': self.date_repair.isoformat(),
            'description_repair': self.description_repair,
            'work_done': self.work_done,
            'cost': self.cost
        }
