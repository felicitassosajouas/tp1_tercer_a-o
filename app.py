from flask import Flask
from config.config import DATABASE_CONNECTION_URI
from routes.client_routes import client
from routes.vehicles_routes import vehicles
from routes.repairs_routes import repairs
from models.db import db
from flask_cors import CORS #para poder correr react con npm run dev

app = Flask(__name__)

CORS(app)

# Registros de los blue
app.register_blueprint(client)
app.register_blueprint(vehicles)
app.register_blueprint(repairs)

# Configuracion de la base de datos
app.config["SQLALCHEMY_DATABASE_URI"]= DATABASE_CONNECTION_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicio de la base de datos
db.init_app(app)

# Importar modelos y crear tablas
with app.app_context():
    from models.client import Client
    from models.vehicles import Vehicle
    from models.repairs import Repair
    db.create_all()

if __name__ == '__main__':
    app.run(port=5021,debug=True)