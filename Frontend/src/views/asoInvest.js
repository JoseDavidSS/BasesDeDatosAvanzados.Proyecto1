import React, { useState,useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
function User() {
  
  const [inv, setInv] = useState([]); 
  const [proy, setProy] = useState([]); 

  const [logicaInv, setlogicaInv] = useState(null); // State to track the selected ID
  const [selectedProjects, setSelectedProjects] = useState([]); // State to track selected projects

  const handleIdClick = (id) => {
    setlogicaInv(id === logicaInv ? null : id);
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

  useEffect(() => {
    // Esta función se ejecutará cuando el componente se monte
    handleObtenerArticulosProyectos();
  }, []); // El array vacío como segundo argumento significa que se ejecutará solo una vez

  const handleObtenerArticulosProyectos = () => {
    // Realiza una solicitud GET al backend para obtener datos
    axios.get("http://localhost:8080/admin/AsociarInvestigador")
    .then(response => {
      // En este punto, `response.data` contiene los datos recibidos del backend
      console.log("Datos recibidos del backend con éxito:", response.data);
      // Suponiendo que response.data es un array con dos sub-arrays
      const [investigadora, proyectos] = response.data;

      // Extraer solo los valores de 'tituloPu' y 'tituloPr' y actualizar los estados
      const titulosInv = investigadora.map(articulo => articulo.nombreC);
      const titulosProy = proyectos.map(proyecto => proyecto.tituloPr);
      setInv(titulosInv);
      setProy(titulosProy);

    })
    .catch(error => {
      console.error('Error al obtener datos del backend:', error);
    });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h3">Asociar Investigador(a)</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Investigador(a)</Form.Label>
                        <div className="button-list">
                          {inv.map((id, index) => (
                            <Button
                              key={index}
                              variant={id === logicaInv ? "success" : "info"}
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
                      type="submit"
                      variant="info"
                    >
                      Asociar
                    </Button>
                  </Row>
                  <div>
                    <h4>Nombre de la investigador(a):</h4>
                    <p>{logicaInv}</p>
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
