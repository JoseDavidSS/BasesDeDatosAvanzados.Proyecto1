import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function User() {
  //Aqui hay que hacer un getIDs
  const ids = [];
  for (let id = 0; id <= 10; id++) {
      ids.push(id);
  }
  const [selectedModification, setSelectedModification] = useState("1"); // El año seleccionado
  const handleModificationChange = (e) => {
      setSelectedModification(e.target.value); // Actualizar el año seleccionado
  };
  useEffect(() => {
    console.log('Valor seleccionado:', selectedModification);
  }, [selectedModification]);
  
  return (
    <>
      <Container fluid>
        <Row>
        <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Crear proyectos</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>Título del proyecto de investigación</label>
                        <Form.Control
                          defaultValue=""
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>Área de conocimiento</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Física, Matemáticas, Biología, ..."
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>Duración en meses del proyecto</label>
                        <Form.Control
                          placeholder="1,2,3,..."
                          type="number"
                          min="0"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br /> {/* Salto de línea */}
                  <Button className="btn-fill pull-right" type="submit" variant="info">
                    Crear proyecto
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Modificar proyectos</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <Form.Label>ID del proyecto</Form.Label>
                          <Form.Control as="select">
                            {ids.map((id) => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                            ))}
                          </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Dato a modificar</label>
                        <Form.Control as="select" value={selectedModification} onChange={handleModificationChange}> 
                        <option value="1">Título del proyecto de investigación</option>
                        <option value="2">Área de conocimiento</option>
                        <option value="3">Duración en meses del proyecto</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {selectedModification === "1" && (
                    <Row>
                      <Col md="10">
                        <Form.Group>
                          <label>Título del proyecto de investigación</label>
                          <Form.Control defaultValue="" type="text"></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                  {selectedModification === "2" && (
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>Área de conocimiento</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Física, Matemáticas, Biología, ..."
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  )}
                  {selectedModification === "3" && (
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>Duración en meses del proyecto</label>
                        <Form.Control
                          placeholder="1,2,3,..."
                          type="number"
                          min="0"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  )}
                  <br /> {/* Salto de línea */}
                  <Button className="btn-fill pull-right" type="submit" variant="info">
                    Modificar proyecto
                  </Button>
                  <div className="clearfix"></div>
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
