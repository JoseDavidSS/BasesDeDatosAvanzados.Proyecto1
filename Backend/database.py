from py2neo import Graph
import credentials as cred

graph = Graph(cred.NEO4J_URI, auth=(cred.NEO4J_USERNAME, cred.NEO4J_PASSWORD))
try:
    graph.run("Match () Return 1 Limit 1")
    print('ok')
except Exception:
    print('not ok')

def load_data():
    print("se van a agragar los datos...")
    load_Investigadores()
    print("se agregaron los datos")

def load_Investigadores():
    query = """
            LOAD CSV WITH HEADERS FROM 'file:///Information\Investigadores.csv' AS row
            CREATE (n:NombreNodo {propiedad1: row.id, propiedad2: row.nombre_completo, propiedad3: row.titulo_academico, propiedad4: row.institucion, propiedad5: row.email})
            """
    result = graph.run(query)

load_data()


