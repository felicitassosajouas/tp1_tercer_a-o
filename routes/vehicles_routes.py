from sqlalchemy.exc import IntegrityError
from flask import Blueprint, jsonify, request
from models.db import db
from models.vehicles import Vehicle

vehicles = Blueprint('vehicles', __name__)

@vehicles.route('/api/vehicles')
def get_vehicles():
    vehicles_list = Vehicle.query.all()
    return jsonify([vehicle.serialize() for vehicle in vehicles_list])


@vehicles.route('/api/add_vehicle', methods=['POST'])
def add_vehicle():
    data = request.get_json()

    required_fields = ['brand', 'model', 'patente', 'year_vehicles', 'cost', 'id_client']
    if not data or not all(field in data for field in required_fields):
        return jsonify({'error': 'Faltan datos requeridos'}), 400

    try:
        new_vehicle = Vehicle(
            brand=data['brand'],
            model=data['model'],
            patente=data['patente'],
            year_vehicles=int(data['year_vehicles']),
            cost=data['cost'],
            id_client=int(data['id_client'])
        )

        db.session.add(new_vehicle)
        db.session.commit()

        return jsonify({'message': 'Vehículo agregado exitosamente', 'vehicle': new_vehicle.serialize()}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Error de integridad, puede que la patente ya esté registrada'}), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@vehicles.route('/api/del_vehicle/<string:patente>', methods=['DELETE'])
def delete_vehicle(patente):
    vehicle = Vehicle.query.get(patente)

    if not vehicle:
        return jsonify({'message': 'Vehículo no encontrado'}), 404
    try:
        db.session.delete(vehicle)
        db.session.commit()
        return jsonify({'message': 'Vehículo eliminado correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@vehicles.route('/api/up_vehicle/<string:patente>', methods=['PUT'])
def update_vehicle(patente):
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No se recibieron datos'}), 400

    vehicle = Vehicle.query.get(patente)

    if not vehicle:
        return jsonify({'error': 'Vehículo no encontrado'}), 404

    try:
        vehicle.brand = data['brand']
        vehicle.model = data['model']
        vehicle.year_vehicles = int(data['year_vehicles'])
        vehicle.cost = data['cost']
        vehicle.id_client = int(data['id_client'])

        db.session.commit()
        return jsonify({'message': 'Vehículo actualizado correctamente', 'vehicle': vehicle.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@vehicles.route('/api/patch_vehicle/<string:patente>', methods=['PATCH'])
def patch_vehicle(patente):
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No se recibieron datos'}), 400

    vehicle = Vehicle.query.get(patente)

    if not vehicle:
        return jsonify({'error': 'Vehículo no encontrado'}), 404

    try:
        if 'brand' in data:
            vehicle.brand = data['brand']
        if 'model' in data:
            vehicle.model = data['model']
        if 'year_vehicles' in data:
            vehicle.year_vehicles = int(data['year_vehicles'])
        if 'cost' in data:
            vehicle.cost = data['cost']
        if 'id_client' in data:
            vehicle.id_client = int(data['id_client'])

        db.session.commit()
        return jsonify({'message': 'Vehículo actualizado correctamente', 'vehicle': vehicle.serialize()}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
