import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
//título, año de publicación, revista donde se publicó.
function User() {
    const [selectedYear, setSelectedYear] = useState(""); // El año seleccionado
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value); // Actualizar el año seleccionado
    };
    // Crear una lista de años desde 1900 hasta el año actual
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1900; year <= currentYear; year++) {
        years.push(year);
    }
    return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Crear publicaciones</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
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
                        <Form.Label>Año del proyecto</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedYear}
                                onChange={handleYearChange}
                            >
                            {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                            ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Revista de publicación</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Revista de Ciencias Médicas"
                          type="text"
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
                <Card.Title as="h4">Modificar publicaciones</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
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
                        <Form.Label>Año del proyecto</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedYear}
                                onChange={handleYearChange}
                            >
                            {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                            ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Revista de publicación</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Revista de Ciencias Médicas"
                          type="text"
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
