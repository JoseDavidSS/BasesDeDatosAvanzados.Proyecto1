import React, { useState,useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function User() {
  const inv = ["Aldo", "Jose", "Vale"];
  const proy = ["P1", "P2", "P3","P4", "P5", "P6"];  
  
  const [logicaInv, setlogicaInv] = useState(null); // State to track the selected ID
  const [selectedProjects, setSelectedProjects] = useState([]); // State to track selected projects

  const handleIdClick = (id) => {
    setlogicaInv(id === logicaInv ? null : id);
  };
  useEffect(() => {
    console.log("logicaID:", logicaInv);
  }, [logicaInv]);

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
                    <h4>ID Seleccionado:</h4>
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
