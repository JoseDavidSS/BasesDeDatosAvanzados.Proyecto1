from flask import Flask, request, jsonify
from neo4j import GraphDatabase
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Se usa para habilitar el Cross-Origin Resource Sharing (CORS)

# Se configura la conexión a la base de datos Neo4j
driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "12345678"))
session=driver.session()

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

            for nodo in datos_investigadoresProy:
                print(nodo)
                idInv = nodo['idInv']
                idProy = nodo['idProy']
                session.write_transaction(crear_nodos_investigadoresProy, idInv, idProy)

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

def crear_nodos_investigadoresProy(tx, idInv, idProy):
    query = (
        "MATCH (in:Investigador), (pr:Proyecto) "
        "WHERE in.id = $idInv AND pr.idPry = $idProy "
        "CREATE (in)-[:AFILIADO_A]->(pr)"
    )
    tx.run(query, idInv=idInv, idProy=idProy)

def crear_nodos_publicacionesProy(tx, idProyecto, idArt):
    query = (
        "MATCH (pu:Publicacion), (pr:Proyecto) "
        "WHERE pu.idPub = $idArt AND pr.idPry=$idProyecto "
        "CREATE (pu)-[:RELACIONADO_A]->(pr)"
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

datoCrearId = []
datoCrearNombre = []
datoCrearApellido = []
datoCrearTituloAcademico = []
datoCrearInstitucion = []
datoCrearCorreo = []
datoModificacionSeleccionada = []
@app.route('/admin/MantenimientoProyectos', methods=['POST'])
def crear_modificar_proyectos():
    print("se va a modificar o crear un proyecto...")
    try:
        # Verificar con una bandera si es creación (1) o modificación (0).
        dato_bandera = request.json.get('crear')
        print(dato_bandera)

        if dato_bandera == "1":
            print("se va a crear un proyecto...")
            # Se obtienen los datos enviados desde el frontend para la creación del proyecto
            dato_crearId = request.json.get('crearIdProyecto')
            print('ID de proyecto: ' + dato_crearId)
            dato_crearTituloProyecto = request.json.get('crearTituloProyecto')
            print('Título de poryecto: ' + dato_crearTituloProyecto)
            dato_crearAnnoProyecto = request.json.get('crearAnnoProyecto')
            print('Año de inicio: ' + dato_crearAnnoProyecto)
            dato_crearDuracionProyecto = request.json.get('crearDuracionProyecto')
            print('Duración de proyecto: ' + dato_crearDuracionProyecto)
            dato_crearAreaProyecto = request.json.get('crearAreaProyecto')
            print('Area de conocimiento: ' + dato_crearAreaProyecto)

            # Se almacenan los datos en la lista para luego agregarlos a la base de datos
            datoCrearId.extend(dato_crearId)
            print(datoCrearId)

            with driver.session() as session:
                session.write_transaction(crear_nodos_proyectos, dato_crearId, dato_crearTituloProyecto, dato_crearAnnoProyecto, dato_crearDuracionProyecto, dato_crearAreaProyecto)

            session.close()

            print("Proyecto creado con éxito.")

        if dato_bandera == "0":
            print("se va a modificar un proyecto...")

            # Se obtienen los datos enviados desde el frontend para la creación de proyecto
            dato_modificacionSeleccionada = request.json.get('selectedModification')
            print('Modificación seleccionada: ' + dato_modificacionSeleccionada)
            dato_id = request.json.get('id')
            print('ID: ' + dato_id)
            dato_modificarTituloProyecto = request.json.get('modificarTituloProyecto')
            dato_modificarAnnoProyecto = request.json.get('modificarAnnoProyecto')
            dato_modificarDuracionProyecto = request.json.get('modificarDuracionProyecto')
            dato_modificarAreaProyecto = request.json.get('modificarAreaProyecto')

            # Se almacenan los datos en la lista para luego agregarlos a la base de datos
            datoModificacionSeleccionada.extend(dato_modificacionSeleccionada)

            if dato_modificacionSeleccionada == "1":
                print("Se va a modificar título de proyecto...")
                print('Título de proyecto: ' + dato_modificarTituloProyecto)
                with driver.session() as session:
                    session.write_transaction(modificar_proyecto_titulo, dato_id, dato_modificarTituloProyecto)

            if dato_modificacionSeleccionada == "2":
                print("Se va a modificar área de proyecto...")
                print('Área de conocimiento: ' + dato_modificarAreaProyecto)
                with driver.session() as session:
                    session.write_transaction(modificar_proyecto_area, dato_id, dato_modificarAreaProyecto)

            if dato_modificacionSeleccionada == "3":
                print("Se va a modificar duración de proyecto...")
                print('Duración de proyecto: ' + dato_modificarDuracionProyecto)
                with driver.session() as session:
                    session.write_transaction(modificar_proyecto_duracion, dato_id, dato_modificarDuracionProyecto)

            if dato_modificacionSeleccionada == "4":
                print("Se va a modificar año de proyecto...")
                print('Año de proyecto: ' + dato_modificarAnnoProyecto)
                with driver.session() as session:
                    session.write_transaction(modificar_proyecto_anno, dato_id, dato_modificarAnnoProyecto)

            session.close()

            print("Proyecto modificado con éxito.")

        return jsonify({"message": "Datos creados o modificados correctamente."})
    except Exception as e:
        return jsonify({"error": str(e)})

def modificar_proyecto_titulo(tx, id, dato):
    query = (
        "MATCH (pr:Proyecto {idPry: $id}) "
        "SET pr.titulo_proyecto = $dato"
    )
    tx.run(query, id=id, dato=dato)
    print("proyecto modificado")

def modificar_proyecto_area(tx, id, dato):
    query = (
        "MATCH (pr:Proyecto {idPry: $id}) "
        "SET pr.area_conocimiento = $dato"
    )
    tx.run(query, id=id, dato=dato)
    print("proyecto modificado")

def modificar_proyecto_duracion(tx, id, dato):
    query = (
        "MATCH (pr:Proyecto {idPry: $id}) "
        "SET pr.duracion_meses = $dato"
    )
    tx.run(query, id=id, dato=dato)
    print("proyecto modificado")

def modificar_proyecto_anno(tx, id, dato):
    query = (
        "MATCH (pr:Proyecto {idPry: $id}) "
        "SET pr.anno_inicio = $dato"
    )
    tx.run(query, id=id, dato=dato)
    print("proyecto modificado")

datoCrearId = []
datoCrearNombre = []
datoCrearApellido = []
datoCrearTituloAcademico = []
datoCrearInstitucion = []
datoCrearCorreo = []
datoModificacionSeleccionada = []
@app.route('/admin/MantenimientoPublicaciones', methods=['POST', 'OPTIONS'])
def crear_modificar_publicaciones():
    print("se va a modificar o crear un artículo...")
    try:
        # Verificar con una bandera si es creación (1) o modificación (0).
        dato_bandera = request.json.get('crear')
        print(dato_bandera)

        if dato_bandera == "1":
            print("se va a crear un articulo...")
            # Se obtienen los datos enviados desde el frontend para la creación del articulo
            dato_crearId = request.json.get('crearIdPublicacion')
            print('ID de articulo: ' + dato_crearId)
            dato_crearTituloPublicacion = request.json.get('crearTituloPublicacion')
            print('Título de artículo: ' + dato_crearTituloPublicacion)
            dato_crearAnnoPublicacion = request.json.get('selectedYear')
            print('Año de publicación: ' + dato_crearAnnoPublicacion)
            dato_crearRevistaPublicacion = request.json.get('crearRevistaPublicacion')
            print('Revista de publicación: ' + dato_crearRevistaPublicacion)

            # Se almacenan los datos en la lista para luego agregarlos a la base de datos
            datoCrearId.extend(dato_crearId)
            print(datoCrearId)

            with driver.session() as session:
                session.write_transaction(crear_nodos_publicaciones, dato_crearId, dato_crearTituloPublicacion, dato_crearAnnoPublicacion, dato_crearRevistaPublicacion)

            print("Publicacion creada con éxito.")

        if dato_bandera == "0":
            print("se va a modificar un articulo...")

            # Se obtienen los datos enviados desde el frontend para la creación de articulo
            dato_modificacionSeleccionada = request.json.get('selectedModification')
            print('Modificación seleccionada: ' + dato_modificacionSeleccionada)
            dato_id = request.json.get('id')
            print('ID: ' + dato_id)
            dato_modificarTituloPublicacion = request.json.get('modificarTituloPublicacion')
            dato_modificarAnnoPublicacion = request.json.get('selectedYear')
            dato_modificarRevistaPublicacion = request.json.get('modificarRevistaPublicacion')

            # Se almacenan los datos en la lista para luego agregarlos a la base de datos
            datoModificacionSeleccionada.extend(dato_modificacionSeleccionada)

            if dato_modificacionSeleccionada == "1":
                print("Se va a modificar título de articulo...")
                print('Título de articulo: ' + dato_modificarTituloPublicacion)
                with driver.session() as session:
                    session.write_transaction(modificar_articulo_titulo, dato_id, dato_modificarTituloPublicacion)

            if dato_modificacionSeleccionada == "2":
                print("Se va a modificar año de articulo...")
                print('Año de articulo: ' + dato_modificarAnnoPublicacion)
                with driver.session() as session:
                    session.write_transaction(modificar_articulo_anno, dato_id, dato_modificarAnnoPublicacion)

            if dato_modificacionSeleccionada == "3":
                print("Se va a modificar la revista de la publicación...")
                print('Revista de publicación: ' + dato_modificarRevistaPublicacion)
                with driver.session() as session:
                    session.write_transaction(modificar_articulo_revista, dato_id, dato_modificarRevistaPublicacion)

            print("Publicacion modificada con éxito.")

        return jsonify({"message": "Datos creados o modificados correctamente."})
    except Exception as e:
        return jsonify({"error": str(e)})

def modificar_articulo_titulo(tx, id, dato):
    query = (
        "MATCH (pu:Publicacion {idPub: $id}) "
        "SET pu.titulo_publicacion = $dato"
    )
    tx.run(query, id=id, dato=dato)
    print("articulo modificado")

def modificar_articulo_anno(tx, id, dato):
    query = (
        "MATCH (pu:Publicacion {idPub: $id}) "
        "SET pu.anno_publicacion = $dato"
    )
    tx.run(query, id=id, dato=dato)
    print("articulo modificado")

def modificar_articulo_revista(tx, id, dato):
    query = (
        "MATCH (pu:Publicacion {idPub: $id}) "
        "SET pu.nombre_revista = $dato"
    )
    tx.run(query, id=id, dato=dato)
    print("articulo modificado")

@app.route('/admin/AsociarArtículo', methods=['POST'])
def asociar_articulos_proyectos():
    try:

        dato_nombre_publicacion = request.json.get('logicaId')
        dato_nombre_proyecto = request.json.get('selectedProjects')

        print("Publicación: ", dato_nombre_publicacion)
        print("Proyecto: ", dato_nombre_proyecto)

        print(type(dato_nombre_publicacion))
        print(type(dato_nombre_proyecto[0]))

        with driver.session() as session:
            session.write_transaction(asociar_art_proy, dato_nombre_publicacion, dato_nombre_proyecto[0])

        print("Publicacion asociada a poryecto con éxito.")

        return jsonify({"message": "Datos asociados correctamente."})
    
    except Exception as e:
        return jsonify({"error": str(e)})

def asociar_art_proy(tx, titulo_pub, titulo_proy):
    query = (
        "MATCH (pu:Publicacion), (pr:Proyecto) "
        "WHERE pu.titulo_publicacion = $titulo_pub AND pr.titulo_proyecto = $titulo_proy "
        "MERGE (pu)-[:RELACIONADO_A]->(pr)"
    )
    tx.run(query, titulo_pub=titulo_pub, titulo_proy=titulo_proy)
    print("Articulo asociado a proyecto")

@app.route('/admin/AsociarArtículo', methods=['GET'])
def obtener_articulos_proyectos():
    with driver.session() as session:
        articulos= session.read_transaction(obtener_todos_articulos)
        proyectos = session.read_transaction(obtener_todos_proyectos)
    return jsonify(articulos, proyectos)

@app.route('/admin/AsociarInvestigador', methods=['GET'])
def obtener_investigadores_proyectos():
    with driver.session() as session:
        inv = session.read_transaction(obtener_todos_investiadores)
        proyectos = session.read_transaction(obtener_todos_proyectos)
    return jsonify(inv, proyectos)

def obtener_todos_investiadores(tx):
    query = (
        "MATCH (inv:Investigador) "
        "RETURN inv.id AS idInv, inv.email AS email, inv.institucion AS institucion, inv.nombre_completo AS nombreC, inv.titulo_academico AS tituloAc"
    )
    result = tx.run(query)
    inv = [dict(record) for record in result]
    return inv

def obtener_todos_articulos(tx):
    query = (
        "MATCH (pu:Publicacion) "
        "RETURN pu.idPub AS idPu, pu.titulo_publicacion AS tituloPu"
    )
    result = tx.run(query)
    articulos = [dict(record) for record in result]
    return articulos

def obtener_todos_proyectos(tx):
    query = (
        "MATCH (pr:Proyecto) "
        #"RETURN pr.idPry AS id, pr.titulo_proyecto AS titulo, pr.anno_inicio AS anno, pr.duracion_meses AS duracion, pr.area_conocimiento AS area"
        "RETURN pr.idPry AS idPr, pr.titulo_proyecto AS tituloPr"
    )
    result = tx.run(query)
    proyectos = [dict(record) for record in result]
    return proyectos

def obtener_todas_AreasConocimiento(tx):
    query = (
        "MATCH (n) "
        "WHERE n.area_conocimiento IS NOT NULL "
        "RETURN DISTINCT n.area_conocimiento AS area_conocimiento"
    )
    result = tx.run(query)
    areas_conocimiento = [record["area_conocimiento"] for record in result]
    return areas_conocimiento

def obtener_T5_AreasConocimiento(tx):
    query = (
        "MATCH (p:Proyecto) "
        "WITH p.area_conocimiento AS area, COUNT(p) AS contador "
        "ORDER BY contador DESC "
        "LIMIT 5 "
        "RETURN area, contador"
    )
    result = tx.run(query)
    areas_conocimiento = [dict(record) for record in result]
    return areas_conocimiento

def obtener_T5_Instituciones(tx):
    query = (
        "MATCH (i:Investigador)-[:AFILIADO_A]->(p:Proyecto) "
        "WITH i.institucion AS institucion, COUNT(p) AS num_proyectos "
        "ORDER BY num_proyectos DESC "
        "LIMIT 5 "
        "RETURN institucion, num_proyectos"
    )
    result = tx.run(query)
    instituciones = [dict(record) for record in result]
    return instituciones

def obtener_T5_Investigadores(tx):
    query = (
        "MATCH (i:Investigador)-[:AFILIADO_A]->(p:Proyecto) "
        "WITH i.nombre_completo AS nombre_completo, i.institucion AS institucion, COUNT(p) AS num_proyectos "
        "ORDER BY num_proyectos DESC "
        "LIMIT 5 "
        "RETURN nombre_completo, institucion, num_proyectos"
    )
    result = tx.run(query)
    investigadores = [dict(record) for record in result]
    return investigadores

def obtener_InfoInv_Proyectos(tx, id):
    query_investigador = (
        f"MATCH (i:Investigador {{id: '{id}'}}) "
        "RETURN i.nombre_completo AS nombreCompleto, i.institucion AS institucion, i.titulo_academico AS tituloAcademico, i.email AS email;"
    )
    result_investigador = tx.run(query_investigador)
    info_investigador = [dict(record) for record in result_investigador]

    query_proyectos = (
        f"MATCH (i:Investigador {{id: '{id}'}})-[:AFILIADO_A]->(p:Proyecto) "
        "RETURN p.anno_inicio AS annoInicio, p.area_conocimiento AS areaConocimiento, "
        "p.duracion_meses AS duracionMeses, p.idPry AS idProyecto, p.titulo_proyecto AS tituloProyecto;"
    )
    result_proyectos = tx.run(query_proyectos)
    proyectos_afiliados = [dict(record) for record in result_proyectos]
    
    return {"investigador": info_investigador, "proyectos_afiliados": proyectos_afiliados}

def obtener_InfoProy(tx, idProy):
    # Consulta para obtener información de publicaciones relacionadas con el proyecto
    query_publicaciones = (
        f"MATCH (publicacion:Publicacion)-[:RELACIONADO_A]->(proyecto:Proyecto {{idPry: '{idProy}'}}) "
        "RETURN publicacion.anno_publicacion AS anno_publicacion, "
        "publicacion.idPub AS idPub, "
        "publicacion.nombre_revista AS nombre_revista, "
        "publicacion.titulo_publicacion AS titulo_publicacion"
    )
    result_publicaciones = tx.run(query_publicaciones)
    info_publicaciones = [dict(record) for record in result_publicaciones]

    # Consulta para obtener información de investigadores afiliados al proyecto
    query_investigadores = (
        f"MATCH (p:Proyecto {{idPry: '{idProy}'}})<-[:AFILIADO_A]-(i:Investigador) "
        "RETURN i.nombre_completo AS nombreCompleto, "
        "i.institucion AS institucion, "
        "i.titulo_academico AS tituloAcademico, "
        "i.id AS idInvestigador, "
        "i.email AS email"
    )
    result_investigadores = tx.run(query_investigadores)
    info_investigadores = [dict(record) for record in result_investigadores]

    # Consulta para obtener información específica del proyecto
    query_proyecto = (
        f"MATCH (p:Proyecto {{idPry: '{idProy}'}}) "
        "RETURN p.anno_inicio AS annoInicio, "
        "p.area_conocimiento AS areaConocimiento, "
        "p.duracion_meses AS duracionMeses, "
        "p.idPry AS idProyecto, "
        "p.titulo_proyecto AS tituloProyecto"
    )
    result_proyecto = tx.run(query_proyecto)
    info_proyecto = [dict(record) for record in result_proyecto]

    return {
        "publicaciones": info_publicaciones,
        "investigadores": info_investigadores,
        "proyecto": info_proyecto
    }

def obtener_InfoAreaConocimiento(tx, area_conocimiento):
    # Consulta para obtener títulos de Publicaciones según una área de conocimiento específica
    query_publicaciones = (
        f"MATCH (p:Publicacion)-[:RELACIONADO_A]->(pr:Proyecto) WHERE pr.area_conocimiento = '{area_conocimiento}' RETURN p.titulo_publicacion AS titulo"
    )
    result_publicaciones = tx.run(query_publicaciones)
    titulos_publicaciones = [record["titulo"] for record in result_publicaciones]

    # Consulta para obtener títulos de Proyectos según una área de conocimiento específica
    query_proyectos = (
        f"MATCH (p:Proyecto) WHERE p.area_conocimiento = '{area_conocimiento}' RETURN p.titulo_proyecto AS titulo"
    )
    result_proyectos = tx.run(query_proyectos)
    titulos_proyectos = [record["titulo"] for record in result_proyectos]

    return {"publicaciones": titulos_publicaciones, "proyectos": titulos_proyectos}

def obtener_InfoInv_Colegas(tx, id):
    query_investigador = (
        f"MATCH (i:Investigador {{id: '{id}'}}) "
        "RETURN i.nombre_completo AS nombreCompleto, i.institucion AS institucion, i.titulo_academico AS tituloAcademico, i.email AS email;"
    )
    result_investigador = tx.run(query_investigador)
    info_investigador = [dict(record) for record in result_investigador]
    print(info_investigador)
    print(id)

    query_colegas = (
        "MATCH (in1:Investigador)-[:AFILIADO_A]->(proy:Proyecto)<-[:AFILIADO_A]-(in2:Investigador) "
        "WHERE in1.id = $id "
        "RETURN in2.id AS idColega, in2.nombre_completo AS nombreCompleto, in2.institucion AS institucion, in2.titulo_academico AS tituloAcademico, in2.email AS email"
    )

    print(query_colegas)
    result_colegas = tx.run(query_colegas, id=id)
    print(result_colegas)
    colegas = [dict(record) for record in result_colegas]
    print(colegas)
    
    return {"investigador": info_investigador, "colegas": colegas}
def obtener_idPub(tx):
    query = (
        "MATCH (p:Publicacion) "
        "RETURN p.idPub AS idPub;"
    )
    result = tx.run(query)
    todosID = [record["idPub"] for record in result]

    return todosID
def obtener_idInv(tx):
    query = (
        "MATCH (p:Investigador) "
        "RETURN p.id AS idInv;"
    )
    result = tx.run(query)
    todosID = [record["idInv"] for record in result]
    return todosID

def obtener_idPry(tx):
    query = (
        "MATCH (p:Proyecto) "
        "RETURN p.idPry AS idPry;"
    )
    result = tx.run(query)
    todosID = [record["idPry"] for record in result]
    return todosID
@app.route('/admin/Consultas', methods=['GET'])
def obtener_DatosConsulta():
    with driver.session() as session:
        inv = session.read_transaction(obtener_todos_investiadores)
        proy = session.read_transaction(obtener_todos_proyectos)
        art = session.read_transaction(obtener_todos_articulos)
        areaConocimiento = session.read_transaction(obtener_todas_AreasConocimiento)
    return jsonify(inv,proy,art,areaConocimiento)

@app.route('/admin/MantenimientoInvestigadores', methods=['GET'])
def obtener_ID_Inv():
    with driver.session() as session:
        id = session.read_transaction(obtener_idInv)
    return jsonify(id)

@app.route('/admin/MantenimientoProyectos', methods=['GET'])
def obtener_ID_Pry():
    with driver.session() as session:
        id = session.read_transaction(obtener_idPry)
    return jsonify(id)

@app.route('/admin/MantenimientoPublicaciones', methods=['GET'])
def obtener_ID_Publ():
    with driver.session() as session:
        id = session.read_transaction(obtener_idPub)
    return jsonify(id)

def obtener_InfoPublicaciones(tx, listaID):
    publicaciones = []
    proyectos = []

    for idPub in listaID:
        # Consulta para obtener detalles de la Publicación según su ID
        query_publicaciones = (
            f"MATCH (p:Publicacion {{idPub: '{idPub}'}})"
            f"RETURN p.anno_publicacion AS annoPublicacion, p.idPub AS idPublicacion, p.nombre_revista AS nombreRevista, p.titulo_publicacion AS tituloPublicacion;"
        )

        # Consulta para obtener el título del Proyecto relacionado con la Publicación
        query_proyecto = (
            f"MATCH (p:Publicacion {{idPub: '{idPub}'}})-[:RELACIONADO_A]->(pr:Proyecto)"
            f"RETURN pr.titulo_proyecto AS tituloProyecto;"
        )

        # Ejecutar ambas consultas y obtener los resultados
        result_publicaciones = tx.run(query_publicaciones)
        result_proyecto = tx.run(query_proyecto)

        # Almacenar los resultados en las listas correspondientes
        publicaciones.extend([record for record in result_publicaciones])
        proyectos.extend([record for record in result_proyecto])

    return {"publicaciones": publicaciones, "proyectos": proyectos}

@app.route('/admin/Consultas', methods=['POST'])
def tipoConsultas():
    try:
        tipo_consulta = int(request.json.get('tipoConsulta'))
        BuscarNombreInvestigadorID = request.json.get('BuscarNombreInvestigadorID')
        BuscarNombreProyectoID = request.json.get('BuscarNombreProyectoID')
        BuscarAreaConocimientoID = request.json.get('BuscarAreaConocimientoID')
        BuscarNombrePublicacionID = request.json.get('BuscarNombrePublicacionID')
        if tipo_consulta == 1:
            with driver.session() as session:  
                resultados = session.write_transaction(obtener_T5_AreasConocimiento)
        if tipo_consulta == 2:
            with driver.session() as session:  
                resultados = session.write_transaction(obtener_T5_Instituciones)
        if tipo_consulta == 3:
            with driver.session() as session:  
                resultados = session.write_transaction(obtener_T5_Investigadores)
        if tipo_consulta == 4:
            with driver.session() as session:  
                resultados = session.write_transaction(obtener_InfoInv_Proyectos, BuscarNombreInvestigadorID)
        if tipo_consulta == 5:
            with driver.session() as session:  # Suponiendo que 'driver' sea tu objeto de conexión a Neo4j
                resultados = session.write_transaction(obtener_InfoProy, BuscarNombreProyectoID)
        if tipo_consulta == 6:
            with driver.session() as session:  # Suponiendo que 'driver' sea tu objeto de conexión a Neo4j
                resultados = session.write_transaction(obtener_InfoPublicaciones, BuscarNombrePublicacionID)
        if tipo_consulta == 7:
            with driver.session() as session:  # Suponiendo que 'driver' sea tu objeto de conexión a Neo4j
                resultados = session.write_transaction(obtener_InfoAreaConocimiento, BuscarAreaConocimientoID)
        if tipo_consulta == 8:
            with driver.session() as session:  
                resultados = session.write_transaction(obtener_InfoInv_Colegas, BuscarNombreInvestigadorID)
        
        print("tipoConsulta: ", resultados)

        return jsonify({"resultados": resultados})
    
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/admin/AsociarInvestigador', methods=['POST'])
def asociar_investigadores_proyectos():
    try:

        dato_nombre_investigador = request.json.get('logicaInv')
        dato_nombre_proyecto = request.json.get('selectedProjects')

        print("Investigador: ", dato_nombre_investigador)
        print("Proyecto: ", dato_nombre_proyecto)

        for proyecto in dato_nombre_proyecto:
            with driver.session() as session:
                session.write_transaction(asociar_inv_proy, dato_nombre_investigador, proyecto)

        print("Investigador asociado a proyecto con éxito.")

        return jsonify({"message": "Datos asociados correctamente."})
    
    except Exception as e:
        return jsonify({"error": str(e)})
    
def asociar_inv_proy(tx, nombre_inv, titulo_proy):
    query = (
        "MATCH (in:Investigador), (pr:Proyecto) "
        "WHERE in.nombre_completo = $nombre_inv AND pr.titulo_proyecto = $titulo_proy "
        "MERGE (in)-[:AFILIADO_A]->(pr)"
    )
    tx.run(query, nombre_inv=nombre_inv, titulo_proy=titulo_proy)
    print("Investigador asociado a proyecto")
    
if __name__ == '__main__':
    app.run(port=8080)