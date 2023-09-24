from flask import Flask, request, jsonify
from neo4j import GraphDatabase
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Para habilitar el Cross-Origin Resource Sharing (CORS)

# Configura la conexión a la base de datos Neo4j
driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "12345678"))
session=driver.session()

@app.route('/admin/MantenimientoPublicaciones')
def hello_world():
    try:
        
        session.run("Match () Return 1 Limit 1")
        print('ok')
    except Exception:
        print('not ok')

    return '¡Hola, mundo!'

datosCompletos = []
@app.route('/admin/cargarDatos', methods=['POST'])
def cargar_datos():
    try:
        # Obtén los datos enviados desde el frontend
        datos_recibidos = request.json.get('datos')

        # Almacena los datos en la lista (puedes guardarlos en una base de datos)
        datosCompletos.extend(datos_recibidos)
        print(datosCompletos)

        return jsonify({"message": "Datos cargados correctamente"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(port=8080)