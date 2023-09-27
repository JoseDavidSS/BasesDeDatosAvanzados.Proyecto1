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
  //Aqui hay que hacer un getIDs
  const ids = [];
  for (let id = 0; id <= 10; id++) {
      ids.push(id);
  }

  const [crearIdProyecto, setCrearIdProyecto] = useState("");
  const [crearTituloProyecto, setCrearTituloProyecto] = useState("");
  const [crearAnnoProyecto, setCrearAnnoProyecto] = useState("");
  const [crearDuracionProyecto, setCrearDuracionProyecto] = useState("");
  const [crearAreaProyecto, setCrearAreaProyecto] = useState("");

  const handleCrearIdProyecto = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearIdProyecto(event.target.value);
  };

  const handleCrearTituloProyecto = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearTituloProyecto(event.target.value);
  };

  const handleCrearAnnoProyecto = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearAnnoProyecto(event.target.value);
  };

  const handleCrearDuracionProyecto = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearDuracionProyecto(event.target.value);
  };

  const handleCrearAreaProyecto = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearAreaProyecto(event.target.value);
  };

  const [id, setId] = useState("");
  const [modificarTituloProyecto, setModificarTituloProyecto] = useState("");
  const [modificarAnnoProyecto, setModificarAnnoProyecto] = useState("");
  const [modificarDuracionProyecto, setModificarDuracionProyecto] = useState("");
  const [modificarAreaProyecto, setModificarAreaProyecto] = useState("");

  const handleId = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setId(event.target.value);
  };

  const handleModificarTituloProyecto = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setModificarTituloProyecto(event.target.value);
  };

  const handleModificarAnnoProyecto = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setModificarAnnoProyecto(event.target.value);
  };

  const handleModificarDuracionProyecto = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setModificarDuracionProyecto(event.target.value);
  };

  const handleModificarAreaProyecto = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setModificarAreaProyecto(event.target.value);
  };

  const handleCrearProyectos = () => {
    const crear = "1";
    console.log("Bandera:", crear);
    console.log("ID:", crearIdProyecto);
    console.log("Titulo:", crearTituloProyecto);
    console.log("Año:", crearAnnoProyecto);
    console.log("Duración:", crearDuracionProyecto);
    console.log("Área:", crearAreaProyecto);

    // Aquí, envía los datos al backend Flask utilizando Axios
    axios.post("http://localhost:8080/admin/MantenimientoProyectos?", {
      crear,
      crearIdProyecto,
      crearTituloProyecto,
      crearAnnoProyecto,
      crearDuracionProyecto,
      crearAreaProyecto
    })
    .then(response => {
      console.log("Datos enviados al backend con éxito:", response.data);
    })
    .catch(error => {
      console.error('Error al enviar datos al backend:', error);
    });
  };

  const handleModificarProyectos = () => {
    const crear = "0";
    console.log("Bandera:", crear);

    console.log("ID:", id);
    console.log("Titulo:", modificarTituloProyecto);
    console.log("Año:", modificarAnnoProyecto);
    console.log("Duración:", modificarDuracionProyecto);
    console.log("Área:", modificarAreaProyecto);

    // Aquí, envía los datos al backend Flask utilizando Axios
    axios.post("http://localhost:8080/admin/MantenimientoProyectos?", {
      crear,
      selectedModification,
      id,
      modificarTituloProyecto,
      modificarAnnoProyecto,
      modificarDuracionProyecto,
      modificarAreaProyecto
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
                <Card.Title as="h4">Crear proyectos</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>ID</label>
                        <Form.Control
                          type="text"
                          placeholder="Ingrese el ID del proyecto"
                          value={crearIdProyecto}
                          onChange={handleCrearIdProyecto}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>Título del proyecto de investigación</label>
                        <Form.Control
                          placeholder="Ingrese el título del proyecto"
                          type="text"
                          value={crearTituloProyecto}
                          onChange={handleCrearTituloProyecto}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>Año de inicio del proyecto de investigación</label>
                        <Form.Control
                          placeholder="Ingrese el año de inicio del proyecto"
                          type="text"
                          value={crearAnnoProyecto}
                          onChange={handleCrearAnnoProyecto}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>Duración en meses del proyecto</label>
                        <Form.Control
                          placeholder="Ingrese la cantidad en números"
                          type="number"
                          min="0"
                          value={crearDuracionProyecto}
                          onChange={handleCrearDuracionProyecto}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="10">
                      <Form.Group>
                        <label>Área de conocimiento</label>
                        <Form.Control
                          placeholder="Física, Matemáticas, Biología, ..."
                          type="text"
                          value={crearAreaProyecto}
                          onChange={handleCrearAreaProyecto}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br /> {/* Salto de línea */}
                  <Button 
                    className="btn-fill pull-right" 
                    type="submit" 
                    variant="info"
                    onClick={handleCrearProyectos}>
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
                        <label>Dato a modificar</label>
                        <Form.Control as="select" value={selectedModification} onChange={handleModificationChange}> 
                        <option value="1">Título del proyecto de investigación</option>
                        <option value="2">Área de conocimiento</option>
                        <option value="3">Duración en meses del proyecto</option>
                        <option value="4">Año de inicio del proyecto</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {selectedModification === "1" && (
                    <Row>
                      <Col md="10">
                        <Form.Group>
                          <label>Título del proyecto de investigación</label>
                          <Form.Control 
                            value={modificarTituloProyecto}
                            onChange={handleModificarTituloProyecto}
                            type="text"
                          ></Form.Control>
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
                          value={modificarAreaProyecto}
                          onChange={handleModificarAreaProyecto}
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
                          value={modificarDuracionProyecto}
                          onChange={handleModificarDuracionProyecto}
                          placeholder="1,2,3,..."
                          type="number"
                          min="0"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  )}
                  {selectedModification === "4" && (
                    <Row>
                      <Col md="10">
                        <Form.Group>
                          <label>Año de inicio del proyecto</label>
                          <Form.Control 
                            value={modificarAnnoProyecto}
                            onChange={handleModificarAnnoProyecto}
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
                    onClick={handleModificarProyectos}
                  >
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
