import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";

function TableList() {
  
  const AreaConocimiento = ["Ciencias Ambientales", "Informática", "Nanociencia"];
  const NombreInv = ["Aldo", "David", "Olga"];
  const NombreProyecto =["Proyecto 1", "Proyecto 2", "Proyecto 3", "Proyecto 4"]; // Ejemplo de datos
  const NombrePublicaciones =["Publicación 1", "Publicación 2", "Publicación 3", "Publicación 4"];
  const [BuscarColega, setBuscarColega] = useState("");
  const [BuscarAreaConocimiento, setBuscarAreaConocimiento] = useState("");
  const [BuscarNombrePublicacion, setBuscarNombrePublicacion] = useState([]);
  const [BuscarNombreProyecto, setBuscarNombreProyecto] = useState("");
  const [BuscarNombreInvestigador, setBuscarNombreInvestigador] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState('1'); // Valor inicial, puedes cambiarlo según tus necesidades

  const handleProyectoClick = (proyecto) => {
    if (BuscarNombrePublicacion.includes(proyecto)) {
      // Si el proyecto ya está seleccionado, quítalo de la lista
      setBuscarNombrePublicacion(BuscarNombrePublicacion.filter((p) => p !== proyecto));
    } else {
      // Si el proyecto no está seleccionado, agrégalo a la lista
      setBuscarNombrePublicacion([...BuscarNombrePublicacion, proyecto]);
    }
  };
  useEffect(() => {
    console.log('Valor seleccionado:', tipoConsulta);
  }, [tipoConsulta]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Form.Group>
              <label>Tipo de consulta</label>
              <Form.Control as="select" value={tipoConsulta} onChange={(e) => setTipoConsulta(e.target.value)}>
                <option value="1">Top 5 de áreas de conocimiento</option>
                <option value="2">Top 5 de instituciones</option>
                <option value="3">Top 5 investigadores(as)</option>
                <option value="4">Búsqueda de un(a) investigador(a)</option>
                <option value="5">Búsqueda de un proyecto</option>
                <option value="6">Búsqueda de publicaciones</option>
                <option value="7">Búsqueda por área de conocimiento</option>
                <option value="8">Búsqueda de colegas</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md="6" className="d-flex align-items-end justify-content-start">
            <Button className="btn-fill" variant="info"> Buscar</Button>
          </Col>
          {(tipoConsulta === "4") &&(
            <Col md="6" className="d-flex align-items-end justify-content-start">
              <Form.Group>
              <br /> {/* Salto de línea */}
                <Form.Label>Investigadores(as)</Form.Label>
                  <Form.Control as="select"
                    value={BuscarNombreInvestigador} 
                    onChange={(e) => setBuscarNombreInvestigador(e.target.value)}> 
                    {NombreInv.map((BuscarNombreInvestigador) => (
                    <option key={BuscarNombreInvestigador} value={BuscarNombreInvestigador}>
                        {BuscarNombreInvestigador}
                    </option>
                    ))}
                  </Form.Control>
              </Form.Group>
            </Col>
          )}
          {(tipoConsulta === "5") && (
            <Col md="6" className="d-flex align-items-end justify-content-start">
            <Form.Group>
            <br /> {/* Salto de línea */}
              <Form.Label>Proyectos</Form.Label>
                <Form.Control as="select"
                  value={BuscarNombreProyecto} 
                  onChange={(e) => setBuscarNombreProyecto(e.target.value)}> 
                  {NombreProyecto.map((BuscarNombreProyecto) => (
                  <option key={BuscarNombreProyecto} value={BuscarNombreProyecto}>
                      {BuscarNombreProyecto}
                  </option>
                  ))}
                </Form.Control>
            </Form.Group>
          </Col>
          )}
          {(tipoConsulta === "6") &&(
            <Col md="6" className="d-flex align-items-end justify-content-start">
              <div className="button-list">
                <br /> {/* Salto de línea */}
                  {NombrePublicaciones.map((proyecto) => (
                    <Button
                      key={proyecto}
                      variant={BuscarNombrePublicacion.includes(proyecto) ? "success" : "info"}
                      className="btn-fill"
                      onClick={() => handleProyectoClick(proyecto)}
                    >
                      {proyecto}
                    </Button>
                  ))}
              </div>
            </Col>
          )}
          {(tipoConsulta === "7") &&(
            <Col md="6" className="d-flex align-items-end justify-content-start">
              <Form.Group>
              <br /> {/* Salto de línea */}
                <Form.Label>Areas de conocimiento</Form.Label>
                  <Form.Control as="select"
                    value={BuscarAreaConocimiento} 
                    onChange={(e) => setBuscarAreaConocimiento(e.target.value)}> 
                    {AreaConocimiento.map((BuscarAreaConocimiento) => (
                    <option key={BuscarAreaConocimiento} value={BuscarAreaConocimiento}>
                        {BuscarAreaConocimiento}
                    </option>
                    ))}
                  </Form.Control>
              </Form.Group>
            </Col>
          )}
          {(tipoConsulta === "8") &&(
            <Col md="6" className="d-flex align-items-end justify-content-start">
              <Form.Group>
              <br /> {/* Salto de línea */}
                <Form.Label>Colegas</Form.Label>
                  <Form.Control as="select"
                    value={BuscarColega} 
                    onChange={(e) => setBuscarColega(e.target.value)}> 
                    {NombreInv.map((BuscarColega) => (
                    <option key={BuscarColega} value={BuscarColega}>
                        {BuscarColega}
                    </option>
                    ))}
                  </Form.Control>
              </Form.Group>
            </Col>
          )}
        </Row>
        <br /> {/* Salto de línea */}
        {tipoConsulta === "1" &&(
          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Top 5 de áreas de conocimiento</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Área de conocimiento</th>
                      <th className="border-0">Número de proyectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mate</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>Biologia</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>Física</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Letras</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Quimica</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}
        {tipoConsulta === "2" &&(
          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Top 5 de instituciones</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Nombre de la institución</th>
                      <th className="border-0">Número de proyectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TEC</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>UCR</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>UNA</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>CARD</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>UL</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}
        {tipoConsulta === "3" &&(
          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Top 5 investigadores(as)</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Nombre de los investigadores(as)</th>
                      <th className="border-0">Institución donde labora</th>
                      <th className="border-0">Número de proyectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Aldo</td>
                      <td>TEC</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>Aldo</td>
                      <td>UCR</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>Aldo</td>
                      <td>UNA</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Aldo</td>
                      <td>CARD</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Aldo</td>
                      <td>UL</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}{tipoConsulta === "4" &&(
          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Investigadores(as)</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre completo</th>
                      <th className="border-0">Titulo academinco</th>
                      <th className="border-0">Institución en la cual labora</th>
                      <th className="border-0">Correo electronico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>Aldo Cambronero Ureña</td>
                      <td>PhD</td>
                      <td>TEC</td>
                      <td>Cambroneroaldo@gmail.com</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Proyectos</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre proyecto</th>
                      <th className="border-0">Año inicio</th>
                      <th className="border-0">Duracion meses</th>
                      <th className="border-0">Area de conocimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}
        {tipoConsulta === "5" &&(
          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Proyecto</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre proyecto</th>
                      <th className="border-0">Año inicio</th>
                      <th className="border-0">Duracion meses</th>
                      <th className="border-0">Area de conocimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>xd</td>
                      <td>2018</td>
                      <td>56</td>
                      <td>Mate</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Investigadores(as)</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre completo</th>
                      <th className="border-0">Titulo academinco</th>
                      <th className="border-0">Institución en la cual labora</th>
                      <th className="border-0">Correo electronico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Publicaciones</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre de la publicación</th>
                      <th className="border-0">Año de publicación</th>
                      <th className="border-0">Nombre de la revista</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}
        {tipoConsulta === "6" &&(
          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Nombre de area de conocimiento</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre proyecto</th>
                      <th className="border-0">Nombre investigadores(as)</th>
                      <th className="border-0">Duracion meses</th>
                      <th className="border-0">Area de conocimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>xd</td>
                      <td>2018</td>
                      <td>56</td>
                      <td>Mate</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Investigadores(as)</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre completo</th>
                      <th className="border-0">Titulo academinco</th>
                      <th className="border-0">Institución en la cual labora</th>
                      <th className="border-0">Correo electronico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Publicaciones</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre de la publicación</th>
                      <th className="border-0">Año de publicación</th>
                      <th className="border-0">Nombre de la revista</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}
        {tipoConsulta === "7" &&(
          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Nombre de area de conocimiento</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Nombre de investigadores(as)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>aldo</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th className="border-0">Nombre de proyectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Proyecto 1</td>
                    </tr>
                    <tr>
                      <td>Proyecto 2</td>
                    </tr>
                    <tr>
                      <td>Proyecto 3</td>
                    </tr>
                    <tr>
                      <td>Proyecto 4</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th className="border-0">Publicaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Publicaciones 1</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}
        {tipoConsulta === "8" &&(
          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Nombres de colegas</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre completo</th>
                      <th className="border-0">Titulo academinco</th>
                      <th className="border-0">Institución en la cual labora</th>
                      <th className="border-0">Correo electronico</th>
                    </thead>
                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>Aldo Cambronero Ureña</td>
                      <td>PhD</td>
                      <td>TEC</td>
                      <td>Cambroneroaldo@gmail.com</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Nombres de colegas</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Nombre de investigadores(as)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>aldo</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}
      </Container>
    </>
  );
}

export default TableList;
