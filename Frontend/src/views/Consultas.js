import React, { useState, useEffect } from "react";
import dashboardRoutes from 'routes.js';
import Cookies from 'js-cookie'; // Import the Cookies library

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
  const [tipoConsulta, setTipoConsulta] = useState('1'); // Valor inicial, puedes cambiarlo según tus necesidades
    // Agrega este efecto secundario para imprimir el valor seleccionado en la consola
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
            <Button className="btn-fill" type="submit" variant="info"> Buscar</Button>
          </Col>
        </Row>
        <br /> {/* Salto de línea */}
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Top 5 </Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
