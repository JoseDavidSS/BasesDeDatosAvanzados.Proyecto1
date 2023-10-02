import React, { useState,useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function User() {


  const [logicaId, setlogicaId] = useState(null); // State to track the selected ID
  const [selectedProjects, setSelectedProjects] = useState([]); // State to track selected projects

  const handleIdClick = (id) => {
    setlogicaId(id === logicaId ? null : id);
  };

  const handleProjectClick = (project) => {
    if (selectedProjects.includes(project)) {
      // Deselecciona un proyecto
      setSelectedProjects(selectedProjects.filter((p) => p !== project));
    } else {
      // Mete el proyecto a la lista
      setSelectedProjects([...selectedProjects, project]);
    }
  };
  
  const [art, setArt] = useState([]); 
  const [proy, setProy] = useState([]); 

  useEffect(() => {
    // Esta función se ejecutará cuando el componente se monte
    handleObtenerArticulosProyectos();
  }, []); // El array vacío como segundo argumento significa que se ejecutará solo una vez

  const handleObtenerArticulosProyectos = () => {
    // Realiza una solicitud GET al backend para obtener datos
    axios.get("http://localhost:8080/admin/AsociarArtículo")
    .then(response => {
      // En este punto, `response.data` contiene los datos recibidos del backend
      console.log("Datos recibidos del backend con éxito:", response.data);
      // Suponiendo que response.data es un array con dos sub-arrays
      const [articulos, proyectos] = response.data;

      // Extraer solo los valores de 'tituloPu' y 'tituloPr' y actualizar los estados
      const titulosArt = articulos.map(articulo => articulo.tituloPu);
      const titulosProy = proyectos.map(proyecto => proyecto.tituloPr);
      setArt(titulosArt);
      setProy(titulosProy);

    })
    .catch(error => {
      console.error('Error al obtener datos del backend:', error);
    });
  };
  
  const handleAsociarPublicacionProyecto = () => {
    console.log("Artículo:", logicaId);
    console.log("Proyecto:", selectedProjects);

    // Aquí, envía los datos al backend Flask utilizando Axios
    axios.post("http://localhost:8080/admin/AsociarArtículo?", {
      logicaId,
      selectedProjects
    })
    .then(response => {
      console.log("Datos enviados al backend con éxito:", response.data);
    })
    .catch(error => {
      console.error('Error al enviar datos al backend:', error);
    });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h3">Asociar Artículo</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Articulos</Form.Label>
                        <div className="button-list">
                          {art.map((id, index) => (
                            <Button
                              key={index}
                              variant={id === logicaId ? "success" : "info"}
                              className="btn-fill"
                              block
                              onClick={() => handleIdClick(id)}
                            >
                              {id}
                            </Button>
                          ))}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Proyectos</Form.Label>
                        <div className="button-list">
                          {proy.map((project, index) => (
                            <Button
                              key={index}
                              variant={
                                selectedProjects.includes(project)
                                  ? "success"
                                  : "info"
                              }
                              className="btn-fill"
                              block
                              onClick={() => handleProjectClick(project)}
                            >
                              {project}
                            </Button>
                          ))}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Row className="justify-content-center">
                    <Button
                      className="btn-fill pull-right"
                      variant="info"
                      onClick={handleAsociarPublicacionProyecto}
                    >
                      Asociar
                    </Button>
                  </Row>
                  <div>
                    <h4>Articulo Seleccionado:</h4>
                    <p>{logicaId}</p>
                  </div>
                  <div>
                    <h4>Proyectos Seleccionados:</h4>
                    <ul>
                      {selectedProjects.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
