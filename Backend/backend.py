from flask import Flask, request, jsonify
from neo4j import GraphDatabase
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Se usa para habilitar el Cross-Origin Resource Sharing (CORS)

# Se configura la conexión a la base de datos Neo4j
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
        # Se obtienen los datos enviados desde el frontend
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
                idArt = nodo['idArt']
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

datoCrearId = []
datoCrearNombre = []
datoCrearApellido = []
datoCrearTituloAcademico = []
datoCrearInstitucion = []
datoCrearCorreo = []
datoModificacionSeleccionada = []
@app.route('/admin/MantenimientoInvestigadores', methods=['POST', 'OPTIONS'])
def crear_modificar_investigadores():
    print("se va a modificar o crear un investigador...")
    try:
        # Verificar con una bandera si es creación (1) o modificación (0).
        dato_bandera = request.json.get('crear')
        print(dato_bandera)

        if dato_bandera == "1":
            print("se va a crear un investigador...")
            # Se obtienen los datos enviados desde el frontend para la creación de investigador
            dato_crearId = request.json.get('crearIdInvestigador')
            print('ID: ' + dato_crearId)
            dato_crearNombre = request.json.get('crearNombreInvestigador')
            print('Nombre: ' + dato_crearNombre)
            dato_crearApellido = request.json.get('crearApellidoInvestigador')
            print('Apellido: ' + dato_crearApellido)
            dato_crearTituloAcademico = request.json.get('crearTituloAcademico')
            print('Título académico: ' + dato_crearTituloAcademico)
            dato_crearInstitucion = request.json.get('crearInstitucion')
            print('Institución donde labora: ' + dato_crearInstitucion)
            dato_crearCorreo = request.json.get('crearCorreo')
            print('Correo electrónico: ' + dato_crearCorreo)
            dato_crearNombreCompleto = dato_crearNombre + ' ' + dato_crearApellido
            print('Nombre completo: ' + dato_crearNombreCompleto)

            # Se almacenan los datos en la lista para luego agregarlos a la base de datos
            datoCrearId.extend(dato_crearId)
            print(datoCrearId)

            with driver.session() as session:
                session.write_transaction(crear_nodos_investigadores, dato_crearId, dato_crearNombreCompleto, dato_crearTituloAcademico, dato_crearInstitucion, dato_crearCorreo)

            print("Investigador creado con éxito.")

        if dato_bandera == "0":
            print("se va a modificar un investigador...")

            # Se obtienen los datos enviados desde el frontend para la creación de investigador
            dato_modificacionSeleccionada = request.json.get('selectedModification')
            print('Modificación seleccionada: ' + dato_modificacionSeleccionada)
            dato_id = request.json.get('id')
            print('ID: ' + dato_id)
            dato_modificarNombre = request.json.get('modificarNombreInvestigador')
            dato_modificarApellido = request.json.get('modificarApellidoInvestigador')
            dato_modificarTituloAcademico = request.json.get('modificarTituloAcademico')
            dato_modificarInstitucion = request.json.get('modificarInstitucion')
            dato_modificarCorreo = request.json.get('modificarCorreo')
            dato_modificarNombreCompleto = dato_modificarNombre + ' ' + dato_modificarApellido

            # Se almacenan los datos en la lista para luego agregarlos a la base de datos
            datoModificacionSeleccionada.extend(dato_modificacionSeleccionada)

            if dato_modificacionSeleccionada == "1":
                print("Se va a modificar nombre y apellido de investigador...")
                print('Nombre completo: ' + dato_modificarNombreCompleto)
                with driver.session() as session:
                    session.write_transaction(modificar_investigador_nombre_apellido, dato_id, dato_modificarNombreCompleto)

            if dato_modificacionSeleccionada == "2":
                print('Título académico: ' + dato_modificarTituloAcademico)
                print("Se va a modificar título académico de investigador...")
                with driver.session() as session:
                    session.write_transaction(modificar_investigador_titulo, dato_id, dato_modificarTituloAcademico)

            if dato_modificacionSeleccionada == "3":
                print("Se va a modificar institución de investigador...")
                print('Institución donde labora: ' + dato_modificarInstitucion)
                with driver.session() as session:
                    session.write_transaction(modificar_investigador_institucion, dato_id, dato_modificarInstitucion)

            if dato_modificacionSeleccionada == "4":
                print("Se va a modificar correo de investigador...")
                print('Correo electrónico: ' + dato_modificarCorreo)
                with driver.session() as session:
                    session.write_transaction(modificar_investigador_correo, dato_id, dato_modificarCorreo)

            print("Investigador modificado con éxito.")

        return jsonify({"message": "Datos creados o modificados correctamente."})
    except Exception as e:
        return jsonify({"error": str(e)})

def modificar_investigador_nombre_apellido(tx, id, nombre_completo):
    query = (
        "MATCH (in:Investigador {id: $id}) "
        "SET in.nombre_completo = $nombre_completo"
    )
    tx.run(query, id=id, nombre_completo=nombre_completo)
    print("investigador modificado")

def modificar_investigador_titulo(tx, id, titulo):
    query = (
        "MATCH (in:Investigador {id: $id}) "
        "SET in.titulo_academico = $titulo"
    )
    tx.run(query, id=id, titulo=titulo)
    print("investigador modificado")

def modificar_investigador_institucion(tx, id, nombre_completo):
    query = (
        "MATCH (in:Investigador {id: $id}) "
        "SET in.institucion = $nombre_completo"
    )
    tx.run(query, id=id, nombre_completo=nombre_completo)
    print("investigador modificado")

def modificar_investigador_correo(tx, id, nombre_completo):
    query = (
        "MATCH (in:Investigador {id: $id}) "
        "SET in.email = $nombre_completo"
    )
    tx.run(query, id=id, nombre_completo=nombre_completo)
    print("investigador modificado")

if __name__ == '__main__':
    app.run(port=8080)