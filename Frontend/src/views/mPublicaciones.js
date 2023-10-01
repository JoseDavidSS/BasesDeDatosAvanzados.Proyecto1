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

    const [crearIdPublicacion, setCrearIdPublicacion] = useState("");
    const [crearTituloPublicacion, setCrearTituloPublicacion] = useState("");
    //const [crearAnnoPublicacion, setCrearAnnoPublicacion] = useState("");
    const [crearRevistaPublicacion, setCrearRevistaPublicacion] = useState("");
  
    const handleCrearIdPublicacion = (event) => {
      // Actualiza el estado con el valor del campo de entrada
      setCrearIdPublicacion(event.target.value);
    };
  
    const handleCrearTituloPublicacion = (event) => {
      // Actualiza el estado con el valor del campo de entrada
      setCrearTituloPublicacion(event.target.value);
    };
  
    const handleCrearRevistaPublicacion = (event) => {
      // Actualiza el estado con el valor del campo de entrada
      setCrearRevistaPublicacion(event.target.value);
    };
  
    const [id, setId] = useState("");
    const [modificarTituloPublicacion, setModificarTituloPublicacion] = useState("");
    //const [modificarAnnoPublicacion, setModificarAnnoPublicacion] = useState("");
    const [modificarRevistaPublicacion, setModificarRevistaPublicacion] = useState("");
  
    const handleId = (event) => {
      // Actualiza el estado con el valor del campo de entrada
      setId(event.target.value);
    };
  
    const handleModificarTituloPublicacion = (event) => {
      // Actualiza el estado con el valor del campo de entrada
      setModificarTituloPublicacion(event.target.value);
    };
  
    const handleModificarRevistaPublicacion = (event) => {
      // Actualiza el estado con el valor del campo de entrada
      setModificarRevistaPublicacion(event.target.value);
    };

    const handleCrearPublicaciones = () => {
      const crear = "1";
      console.log("Bandera:", crear);
      console.log("ID:", crearIdPublicacion);
      console.log("Titulo:", crearTituloPublicacion);
      console.log("Año:", selectedYear);
      console.log("Revista:", crearRevistaPublicacion);
  
      // Aquí, envía los datos al backend Flask utilizando Axios
      axios.post("http://localhost:8080/admin/MantenimientoPublicaciones?", {
        crear,
        crearIdPublicacion,
        crearTituloPublicacion,
        selectedYear,
        crearRevistaPublicacion
      })
      .then(response => {
        console.log("Datos enviados al backend con éxito:", response.data);
      })
      .catch(error => {
        console.error('Error al enviar datos al backend:', error);
      });
    };
  
    const handleModificarPublicaciones = () => {
      const crear = "0";
      console.log("Bandera:", crear);
  
      console.log("ID:", id);
      console.log("Titulo:", modificarTituloPublicacion);
      console.log("Año:", selectedYear);
      console.log("Revista:", modificarRevistaPublicacion);
  
      // Aquí, envía los datos al backend Flask utilizando Axios
      axios.post("http://localhost:8080/admin/MantenimientoPublicaciones?", {
        crear,
        selectedModification,
        id,
        modificarTituloPublicacion,
        selectedYear,
        modificarRevistaPublicacion
      })
      .then(response => {
        console.log("Datos enviados al backend con éxito:", response.data);
      })
      .catch(error => {
        console.error('Error al enviar datos al backend:', error);
      });
    };

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
                        <label>ID del artículo</label>
                        <Form.Control
                          value={crearIdPublicacion}
                          onChange={handleCrearIdPublicacion}
                          placeholder="Ingrese el ID de la publicación"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Título del artículo</label>
                        <Form.Control
                          value={crearTituloPublicacion}
                          onChange={handleCrearTituloPublicacion}
                          placeholder="Ingrese el título de la publicación"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>Año de publicación</Form.Label>
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
                          value={crearRevistaPublicacion}
                          onChange={handleCrearRevistaPublicacion}
                          placeholder="Ingrese el nombre de la revista"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br /> {/* Salto de línea */}
                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={handleCrearPublicaciones}
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
                        <Form.Label>ID de la publicación</Form.Label>
                          <Form.Control as="select"
                            value={id} 
                            onChange={handleId}>
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
                        <label>Dato a modificar del artículo</label>
                        <Form.Control as="select" value={selectedModification} onChange={handleModificationChange}> 
                        <option value="1">Título del artículo</option>
                        <option value="2">Año de publicación</option>
                        <option value="3">Revista de publicación</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {selectedModification === "1" && (
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Título del artículo</label>
                        <Form.Control
                          value={modificarTituloPublicacion} 
                          onChange={handleModificarTituloPublicacion}
                          placeholder="Ingrese el nuevo título"
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
                        <Form.Label>Año de publicación</Form.Label>
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
                          value={modificarRevistaPublicacion} 
                          onChange={handleModificarRevistaPublicacion}
                          placeholder="Ingrese en nombre de la nueva revista"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  )}
                  <br /> {/* Salto de línea */}
                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={handleModificarPublicaciones}
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
