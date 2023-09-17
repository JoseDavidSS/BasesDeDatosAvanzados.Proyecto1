import React from "react";

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
//nombre completo, título académico (ejemplo: licenciado,
//doctora, máster, etc), nombre de la institución donde labora, correo
//electrónico.
function User() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Crear - Modificar investigadores/as</Card.Title>
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
                    Crear - Modificar
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
