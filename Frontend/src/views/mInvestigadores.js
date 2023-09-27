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

  const [crearIdInvestigador, setCrearIdInvestigador] = useState("");
  const [crearNombreInvestigador, setCrearNombreInvestigador] = useState("");
  const [crearApellidoInvestigador, setCrearApellidoInvestigador] = useState("");
  const [crearTituloAcademico, setCrearTituloAcademico] = useState("");
  const [crearInstitucion, setCrearInstitucion] = useState("");
  const [crearCorreo, setCrearCorreo] = useState("");

  const handleCrearIdInvestigador = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearIdInvestigador(event.target.value);
  };

  const handleCrearNombreInvestigador = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearNombreInvestigador(event.target.value);
  };

  const handleCrearApellidoInvestigador = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearApellidoInvestigador(event.target.value);
  };

  const handleCrearTituloAcademico = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearTituloAcademico(event.target.value);
  };

  const handleCrearInstitucion = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearInstitucion(event.target.value);
  };

  const handleCrearCorreo = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setCrearCorreo(event.target.value);
  };

  const [id, setId] = useState("");
  const [modificarNombreInvestigador, setModificarNombreInvestigador] = useState("");
  const [modificarApellidoInvestigador, setModificarApellidoInvestigador] = useState("");
  const [modificarTituloAcademico, setModificarTituloAcademico] = useState("");
  const [modificarInstitucion, setModificarInstitucion] = useState("");
  const [modificarCorreo, setModificarCorreo] = useState("");

  const handleId = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setId(event.target.value);
  };

  const handleModificarNombreInvestigador = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setModificarNombreInvestigador(event.target.value);
  };

  const handleModificarApellidoInvestigador = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setModificarApellidoInvestigador(event.target.value);
  };

  const handleModificarTituloAcademico = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setModificarTituloAcademico(event.target.value);
  };

  const handleModificarInstitucion = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setModificarInstitucion(event.target.value);
  };

  const handleModificarCorreo = (event) => {
    // Actualiza el estado con el valor del campo de entrada
    setModificarCorreo(event.target.value);
  };

  const handleCrearInvestigadores = () => {
    const crear = "1";
    console.log("Bandera:", crear);
    console.log("ID:", crearIdInvestigador);
    console.log("Nombre:", crearNombreInvestigador);
    console.log("Apellido:", crearApellidoInvestigador);
    console.log("Titulo Académico:", crearTituloAcademico);
    console.log("Institución:", crearInstitucion);
    console.log("Correo:", crearCorreo);

    // Aquí, envía los datos al backend Flask utilizando Axios
    axios.post("http://localhost:8080/admin/MantenimientoInvestigadores?", {
      crear,
      crearIdInvestigador,
      crearNombreInvestigador,
      crearApellidoInvestigador,
      crearTituloAcademico,
      crearInstitucion,
      crearCorreo
    })
    .then(response => {
      console.log("Datos enviados al backend con éxito:", response.data);
    })
    .catch(error => {
      console.error('Error al enviar datos al backend:', error);
    });
  };

  const handleModificarInvestigadores = () => {
    const crear = "0";
    console.log("Bandera:", crear);

    console.log("ID:", id);
    console.log("Nombre:", modificarNombreInvestigador);
    console.log("Apellido:", modificarApellidoInvestigador);
    console.log("Titulo Académico:", modificarTituloAcademico);
    console.log("Institución:", modificarInstitucion);
    console.log("Correo:", modificarCorreo);

    // Aquí, envía los datos al backend Flask utilizando Axios
    axios.post("http://localhost:8080/admin/MantenimientoInvestigadores?", {
      crear,
      selectedModification,
      id,
      modificarNombreInvestigador,
      modificarApellidoInvestigador,
      modificarTituloAcademico,
      modificarInstitucion,
      modificarCorreo
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
                <Card.Title as="h4">Crear investigadores/as</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                  <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>ID</label>
                        <Form.Control
                          placeholder="Inserte ID del investigador"
                          type="text"
                          value={crearIdInvestigador}
                          onChange={handleCrearIdInvestigador}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Nombre</label>
                        <Form.Control
                          placeholder="Inserte nombre del investigador"
                          type="text"
                          value={crearNombreInvestigador}
                          onChange={handleCrearNombreInvestigador}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Apellido</label>
                        <Form.Control
                          placeholder="Inserte apellido del investigador"
                          type="text"
                          value={crearApellidoInvestigador}
                          onChange={handleCrearApellidoInvestigador}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Título Ácademico</label>
                        <Form.Control as="select"
                          value={crearTituloAcademico}
                          onChange={handleCrearTituloAcademico}> 
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
                          placeholder="UNI"
                          type="text"
                          value={crearInstitucion}
                          onChange={handleCrearInstitucion}
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
                          value={crearCorreo}
                          onChange={handleCrearCorreo}
                        ></Form.Control>
                     </Form.Group>
                    </Col>
                  </Row>
                  <br /> {/* Salto de línea */}
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={handleCrearInvestigadores}
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
                        <Form.Control as="select" 
                          value={selectedModification} 
                          onChange={handleModificationChange}> 
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
                          placeholder="Aldo"
                          type="text"
                          value={modificarNombreInvestigador}
                          onChange={handleModificarNombreInvestigador}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Apellido</label>
                        <Form.Control
                          placeholder="Cambronero"
                          type="text"
                          value={modificarApellidoInvestigador}
                          onChange={handleModificarApellidoInvestigador}
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
                        <Form.Control as="select"
                          value={modificarTituloAcademico}
                          onChange={handleModificarTituloAcademico}> 
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
                          placeholder="UNI"
                          type="text"
                          value={modificarInstitucion}
                          onChange={handleModificarInstitucion}
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
                          value={modificarCorreo}
                          onChange={handleModificarCorreo}
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
                    onClick={handleModificarInvestigadores}
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
