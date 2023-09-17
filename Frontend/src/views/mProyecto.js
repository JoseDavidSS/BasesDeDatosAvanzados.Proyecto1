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

//título del proyecto de investigación, año
//de inicio del proyecto, duración en meses, área de conocimiento a la que
//pertenece.
function User() {
  return (
    <>
      <Container fluid>
        <Row>
        <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Crear - Modificar proyectos</Card.Title>
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
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Crear - Modificar proyecto
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
