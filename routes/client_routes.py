from sqlalchemy.exc import IntegrityError
from flask import Blueprint, jsonify, request
from models.db import db
from models.client import Client

client = Blueprint('client', __name__)

@client.route('/api/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    return jsonify([c.serialize() for c in clients])

@client.route('/api/add_client', methods=['POST'])
def add_client():
    data = request.get_json()

    if not data or not all(key in data for key in ['name', 'email', 'phone', 'address']):
        return jsonify({'error': 'Faltan datos requeridos'}), 400

    try:
        new_client = Client(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            address=data['address']
        )
        db.session.add(new_client)
        db.session.commit()
        return jsonify({'message': 'Cliente agregado exitosamente', 'client': new_client.serialize()}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'El email ya está registrado'}), 400

    except Exception as e:
        db.session.rollback()
        print("error",e)
        return jsonify({'error': 'Error al agregar el cliente'}), 500

@client.route("/api/del_client/<int:id>", methods=['DELETE'])
def delete_client(id):
    client = Client.query.get(id)
    if not client: 
        return jsonify({'message':'Cliente no encontrado'}), 404 
    try:
        db.session.delete(client)
        db.session.commit()
        return jsonify({'message': 'Cliente eliminado correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@client.route('/api/up_client/<int:id>', methods=['PUT'])
def update_client(id):
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No se recibieron datos'}), 400

    client = Client.query.get(id)
    if not client:
        return jsonify({'error': 'Cliente no encontrado'}), 404
    
    try:
        # PUT esperaría todos los campos (opcional si querés forzarlo)
        if "name" in data:
            client.name = data['name']
        if 'email' in data:
            client.email = data['email']
        if 'phone' in data:
            client.phone = data['phone']
        if 'address' in data:
            client.address = data['address']

        db.session.commit()
        return jsonify({'message': 'Cliente actualizado correctamente', 'client': client.serialize()}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@client.route('/api/update_client/<int:id>', methods=['PATCH'])
def patch_client(id):
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No se recibieron datos'}), 400

    client = Client.query.get(id)
    if not client:
        return jsonify({'error': 'Cliente no encontrado'}), 404

    try:
        if 'name' in data:
            client.name = data['name']
        if 'email' in data:
            client.email = data['email']
        if 'phone' in data:
            client.phone = data['phone']
        if 'address' in data:
            client.address = data['address']

        db.session.commit()
        return jsonify({'message': 'Cliente actualizado correctamente', 'client': client.serialize()}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
