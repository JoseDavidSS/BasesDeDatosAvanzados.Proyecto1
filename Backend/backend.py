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

datosInvestigadores = []
datosInvestigadoresProy = []
datosProyectos = []
datosPublicaciones = []
datosPublicacionesProy = []
@app.route('/admin/cargarDatos', methods=['POST'])
def cargar_datos():
    try:
        # Obtén los datos enviados desde el frontend
        datos_investigadores = request.json.get('investigadoresData')
        datos_investigadoresProy = request.json.get('investigadoresProyData')
        datos_proyectos = request.json.get('proyectosData')
        datos_publicaciones = request.json.get('publicacionesData')
        datos_publicacionesProy = request.json.get('publicacionesProyData')

        # Almacena los datos en la lista (puedes guardarlos en una base de datos)
        datosInvestigadores.extend(datos_investigadores)
        print(datosInvestigadores)

        with driver.session() as session:
            for nodo in datos_investigadores:
                print(nodo)
                id = nodo['id']
                nombre_completo = nodo['nombre_completo']
                titulo_academico = nodo['titulo_academico']
                institucion = nodo['institucion']
                email = nodo['email']
                session.write_transaction(crear_nodos_investigadores, id, nombre_completo, titulo_academico, institucion, email)

            for nodo in datos_investigadoresProy:
                print(nodo)
                idInv = nodo['idInv']
                idProy = nodo['idProy']
                session.write_transaction(crear_nodos_investigadoresProy, idInv, idProy)

            for nodo in datos_proyectos:
                print(nodo)
                idPry = nodo['idPry']
                titulo_proyecto = nodo['titulo_proyecto']
                anno_inicio = nodo['anno_inicio']
                duracion_meses = nodo['duracion_meses']
                area_conocimiento = nodo['area_conocimiento']
                session.write_transaction(crear_nodos_proyectos, idPry, titulo_proyecto, anno_inicio, duracion_meses, area_conocimiento)

            for nodo in datos_publicaciones:
                print(nodo)
                idPub = nodo['idPub']
                titulo_publicacion = nodo['titulo_publicacion']
                anno_publicacion = nodo['anno_publicacion']
                nombre_revista = nodo['nombre_revista']
                session.write_transaction(crear_nodos_publicaciones, idPub, titulo_publicacion, anno_publicacion, nombre_revista)

            for nodo in datos_publicacionesProy:
                print(nodo)
                idProyecto = nodo['idProyecto']
                print (idProyecto)
                idArt = nodo['idArt']
                print (idArt)
                session.write_transaction(crear_nodos_publicacionesProy, idProyecto, idArt)

        return jsonify({"message": "Datos cargados correctamente"})
    except Exception as e:
        return jsonify({"error": str(e)})
    
def crear_nodos_investigadores(tx, id, nombre_completo, titulo_academico, institucion, email):
    query = (
        "CREATE (in:Investigador {id: $id, nombre_completo: $nombre_completo, titulo_academico: $titulo_academico, institucion: $institucion, email: $email})"
    )
    tx.run(query, id=id, nombre_completo=nombre_completo, titulo_academico=titulo_academico, institucion=institucion, email=email)

def crear_nodos_investigadoresProy(tx, idInv, idProy):
    query = (
        "CREATE (ip:InvestigadorProyecto {idInv: $idInv, idProy: $idProy})"
    )
    tx.run(query, idInv=idInv, idProy=idProy)

def crear_nodos_proyectos(tx, idPry, titulo_proyecto, anno_inicio, duracion_meses, area_conocimiento):
    query = (
        "CREATE (pr:Proyecto {idPry: $idPry, titulo_proyecto: $titulo_proyecto, anno_inicio: $anno_inicio, duracion_meses: $duracion_meses, area_conocimiento: $area_conocimiento})"
    )
    tx.run(query, idPry=idPry, titulo_proyecto=titulo_proyecto, anno_inicio=anno_inicio, duracion_meses=duracion_meses, area_conocimiento=area_conocimiento)

def crear_nodos_publicaciones(tx, idPub, titulo_publicacion, anno_publicacion, nombre_revista):
    query = (
        "CREATE (pu:Publicacion {idPub: $idPub, titulo_publicacion: $titulo_publicacion, anno_publicacion: $anno_publicacion, nombre_revista: $nombre_revista})"
    )
    tx.run(query, idPub=idPub, titulo_publicacion=titulo_publicacion, anno_publicacion=anno_publicacion, nombre_revista=nombre_revista)

def crear_nodos_publicacionesProy(tx, idProyecto, idArt):
    query = (
        "CREATE (pp:PublicacionProyecto {idProyecto: $idProyecto, idArt: $idArt})"
    )
    tx.run(query, idProyecto=idProyecto, idArt=idArt)

if __name__ == '__main__':
    app.run(port=8080)