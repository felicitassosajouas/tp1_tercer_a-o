from sqlalchemy.exc import IntegrityError
from flask import Blueprint, jsonify, request
from models.db import db
from models.repairs import Repair
from datetime import datetime

repairs = Blueprint('repairs', __name__)

@repairs.route('/api/repairs')
def get_repairs():
    all_repairs = Repair.query.all()
    return jsonify([repair.serialize() for repair in all_repairs])

@repairs.route('/api/repairs/<int:id_client>')
def get_repairs_by_client(id_client):
    client_repairs = Repair.query.filter_by(id_client=id_client).all()
    return jsonify([repair.serialize() for repair in client_repairs])

@repairs.route('/api/add_repair', methods=['POST'])
def add_repair():
    data = request.get_json()

    required_fields = ['id_vehicle', 'id_client', 'date_repair', 'description_repair', 'work_done', 'cost']
    if not data or not all(field in data for field in required_fields):
        return jsonify({'error': 'Faltan datos requeridos'}), 400

    try:
        # Convertir fecha si está en string
        date = datetime.strptime(data['date_repair'], '%Y-%m-%d').date()

        new_repair = Repair(
            id_vehicle=data['id_vehicle'],
            id_client=data['id_client'],
            date_repair=date,
            description_repair=data['description_repair'],
            work_done=data['work_done'],
            cost=data['cost']
        )

        db.session.add(new_repair)
        db.session.commit()
        return jsonify({'message': 'Reparación agregada exitosamente', 'repair': new_repair.serialize()}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Error de integridad en los datos'}), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error inesperado: {str(e)}'}), 500

@repairs.route("/api/del_repairs_by_client/<int:id_client>", methods=['DELETE'])
def delete_repairs_by_client(id_client):
    repairs = Repair.query.filter_by(id_client=id_client).all()

    if not repairs:
        return jsonify({'message': 'No se encontraron reparaciones para este cliente'}), 404

    try:
        for repair in repairs:
            db.session.delete(repair)
        db.session.commit()
        return jsonify({'message': 'Reparaciones eliminadas correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@repairs.route('/api/up_repair_by_client/<int:id_client>', methods=['PUT'])
def update_repair_by_client(id_client):
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No se recibieron datos'}), 400

    repair = Repair.query.filter_by(id_client=id_client).first()

    if not repair:
        return jsonify({'error': 'Reparación no encontrada para este cliente'}), 404

    try:
        if 'id_vehicle' in data:
            repair.id_vehicle = data['id_vehicle']
        if 'date_repair' in data:
            repair.date_repair = datetime.strptime(data['date_repair'], '%Y-%m-%d').date()
        if 'description_repair' in data:
            repair.description_repair = data['description_repair']
        if 'work_done' in data:
            repair.work_done = data['work_done']
        if 'cost' in data:
            repair.cost = data['cost']

        db.session.commit()
        return jsonify({'message': 'Reparación actualizada correctamente', 'repair': repair.serialize()}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@repairs.route('/api/patch_repair_by_client/<int:id_client>', methods=['PATCH'])
def patch_repair_by_client(id_client):
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No se recibieron datos'}), 400

    repair = Repair.query.filter_by(id_client=id_client).first()

    if not repair:
        return jsonify({'error': 'Reparación no encontrada para este cliente'}), 404

    try:
        if 'id_vehicle' in data and data['id_vehicle']:
            repair.id_vehicle = data['id_vehicle']
        if 'date_repair' in data and data['date_repair']:
            repair.date_repair = datetime.strptime(data['date_repair'], '%Y-%m-%d').date()
        if 'description_repair' in data and data['description_repair']:
            repair.description_repair = data['description_repair']
        if 'work_done' in data and data['work_done']:
            repair.work_done = data['work_done']
        if 'cost' in data and data['cost']:
            repair.cost = data['cost']

        db.session.commit()
        return jsonify({'message': 'Reparación actualizada correctamente', 'repair': repair.serialize()}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
