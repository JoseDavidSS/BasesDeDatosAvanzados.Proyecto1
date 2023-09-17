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

function User() {
    const ids = ["Aldo", "Jose", "Vale"];
    const proy = ["P1", "P2", "P3","P4", "P5", "P6"];  
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
                          <label></label>
                          <div className="button-list">
                            {ids.map((id, index) => (
                              <Row key={index} >
                                <Col>
                                  <br /> {/* Salto de línea */}
                                  <Button variant="info" className="btn-fill" style={{ width: "150px", height: "50px" }}  >
                                    {id}
                                  </Button>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        </Col>
                        <Col>
                          <div className="button-list">
                            {proy.map((id, index) => (
                              <Row key={index} >
                                <Col>
                                  <br /> {/* Salto de línea */}
                                  <Button variant="info" className="btn-fill" style={{ width: "150px", height: "50px" }}  >
                                    {id}
                                  </Button>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        </Col>
                      </Row>
                      <br /> {/* Salto de línea */}
                      <br /> {/* Salto de línea */}
                      <Row className="justify-content-center">
                        <Button className="btn-fill pull-right" type="submit" variant="info">
                            Asociar
                        </Button>
                        <div className="clearfix"></div>
                      </Row>
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
