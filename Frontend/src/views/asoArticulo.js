import React, { useState,useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function User() {
  const [art, setArt] = useState([]); 
  const [proy, setProy] = useState([]); 
  //let proy = ["P1", "P2", "P3", "P4", "P5", "P6"];

  const [logicaId, setlogicaId] = useState(null); // State to track the selected ID
  const [selectedProjects, setSelectedProjects] = useState([]); // State to track selected projects

  const handleIdClick = (id) => {
    setlogicaId(id === logicaId ? null : id);
  };

  useEffect(async() => {
    await handleObtenerArticulosProyectos();
  }, []);

  const handleProjectClick = (project) => {
    if (selectedProjects.includes(project)) {
      // Deselecciona un proyecto
      setSelectedProjects(selectedProjects.filter((p) => p !== project));
    } else {
      // Mete el proyecto a la lista
      setSelectedProjects([...selectedProjects, project]);
    }
  };

  const handleObtenerArticulosProyectos = async() => {
    // Realiza una solicitud GET al backend para obtener datos
    axios.get("http://localhost:8080/admin/AsociarArtículo")
      .then(response => {
        // En este punto, `response.data` contiene los datos recibidos del backend
        console.log("Datos recibidos del backend con éxito:", response.data);

        let indiceArt = 0
        let indiceProy = 0
        // Itera sobre los objetos en response para extraer los títulos
        for (const item of response.data) {
          console.log("Item 0:", item[0]);

          for (let i = 0; i < item.length; i++) {
            //console.log("Largooooo:", i);

            if (item[indiceArt].tituloPu) {
              //console.log("Item Publicacion:", item[indiceArt].tituloPu);
              art.push(item[indiceArt].tituloPu); // Agrega el título del artículo a la lista art 
              indiceArt += 1;
            }

            else {
              //console.log("Item Proyecto:", item[indiceProy].tituloPr);
              proy.push(item[indiceProy].tituloPr); // Agrega el título del proyecto a la lista proy
              indiceProy += 1;
            }
          }
        }
        
        indiceArt = 0
        indiceProy = 0
        console.log("Articulos:", art);
        console.log("Proyectos:", proy);
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
                <Card.Title as="h3">Asociar Artículo</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>IDs</Form.Label>
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
                      type="submit"
                      variant="info"
                    >
                      Asociar
                    </Button>
                  </Row>
                  <div>
                    <h4>ID Seleccionado:</h4>
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
