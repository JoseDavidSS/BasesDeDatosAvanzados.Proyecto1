import React, { useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function User() {
  const inv = ["Aldo", "Jose", "Vale"];
  const proy = ["P1", "P2", "P3","P4", "P5", "P6"];  
  
  const [Inv, setInv] = useState(null);
  const [logicaInv, setlogicaInv] = useState("Aldo"); // State to track the selected ID
  const [selectedProjects, setSelectedProjects] = useState([]); // State to track selected projects

  const handleIdClick = (id) => {
    if (id === logicaInv) {
      setlogicaInv(null); // Si el mismo botón fue presionado, establece el valor en null.
    } else {
      setlogicaInv(id); // Si se presiona un botón diferente, establece el nuevo valor.
    }
    console.log("logicaInv:",logicaInv);
    //console.log("Inv:",Inv);
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
