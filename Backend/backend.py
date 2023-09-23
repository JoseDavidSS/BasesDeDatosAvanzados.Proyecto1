from flask import Flask, jsonify
from neo4j import GraphDatabase
from flask_cors import CORS

app = Flask(__name__)

# Configura la conexión a la base de datos Neo4j
driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "12345678"))

@app.route('/admin/MantenimientoPublicaciones')
def hello_world():
    return '¡Hola, mundo!'

if __name__ == '__main__':
    app.run(port=8080)