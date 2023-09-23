import React, { useState, useEffect } from "react";
import axios from "axios";
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

    useEffect(() => {
      // Realiza una solicitud GET a tu servidor Flask
      axios.get("http://localhost:8080/admin/MantenimientoPublicaciones") // Reemplaza con la URL de tu servidor Flask
        .then((response) => {
          console.log(response.data); // Imprime la respuesta del servidor en la consola
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    }, []);

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
    useEffect(() => {
      console.log('Valor seleccionado:', selectedYear);
    }, [selectedYear]);


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
                        <option value="1">Institución en la que labora</option>
                        <option value="2">Año del proyecto</option>
                        <option value="3">Revista de publicación</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {selectedModification === "1" && (
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
                  {selectedModification === "2" && (
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
                  )}
                  {selectedModification === "3" && (
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
