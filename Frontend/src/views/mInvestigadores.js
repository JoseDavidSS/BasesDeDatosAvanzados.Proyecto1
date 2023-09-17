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
                <Card.Title as="h4">Crear investigadores/as</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nombre</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Aldo"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Apellido</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Cambronero"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Título Ácademico</label>
                        <Form.Control as="select"> 
                        <option value="PhD">Doctorado (PhD) </option>
                        <option value="MSc">Maestría (MSc)</option>
                        <option value="BS">Bachillerato (BS)</option>
                        <option value="Lic">Licenciatura (Lic)</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>institución en la que labora</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="UNI"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                     <Form.Group>
                        <label>Correo Electrónico</label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                     </Form.Group>
                    </Col>
                  </Row>
                  <br /> {/* Salto de línea */}
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Crear
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
                <Card.Title as="h4">Modificar investigadores/as</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <Form.Label>ID de la persona</Form.Label>
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
                        <option value="1">Nombre completo</option>
                        <option value="2">Título Ácademico</option>
                        <option value="3">Institución en la que labora</option>
                        <option value="4">Correo Electrónico</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {selectedModification === "1" && (
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nombre</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Aldo"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Apellido</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Cambronero"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  )}
                  {selectedModification === "2" && (
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Título Ácademico</label>
                        <Form.Control as="select"> 
                        <option value="PhD">Doctorado (PhD) </option>
                        <option value="MSc">Maestría (MSc)</option>
                        <option value="BS">Bachillerato (BS)</option>
                        <option value="Lic">Licenciatura (Lic)</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  )}
                  {selectedModification === "3" && (
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>institución en la que labora</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="UNI"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  )}
                  {selectedModification === "4" && (
                  <Row>
                    <Col md="12">
                     <Form.Group>
                        <label>Correo Electrónico</label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                     </Form.Group>
                    </Col>
                  </Row>
                  )}
                  <br /> {/* Salto de línea */}
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Modificar
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
