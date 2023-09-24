import React, { useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Papa from "papaparse";
import axios from "axios";

function CargarDatos() {
  const allowedFileNames = [
    "Investigadores.csv",
    "InvestigadoresProy.csv",
    "Proyectos.csv",
    "Publicaciones.csv",
    "PublicacionesProy.csv",
  ];

  const [investigadoresData, setInvestigadoresData] = useState([]);
  const [investigadoresProyData, setInvestigadoresProyData] = useState([]);
  const [proyectosData, setProyectosData] = useState([]);
  const [publicacionesData, setPublicacionesData] = useState([]);
  const [publicacionesProyData, setPublicacionesProyData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      if (allowedFileNames.includes(fileName)) {
        Papa.parse(file, {
          complete: (result) => {
            // result.data contains the parsed CSV data
            const parsedData = result.data;
            switch (fileName) {
              case "Investigadores.csv":
                setInvestigadoresData(parsedData);
                break;
              case "InvestigadoresProy.csv":
                setInvestigadoresProyData(parsedData);
                break;
              case "Proyectos.csv":
                setProyectosData(parsedData);
                break;
              case "Publicaciones.csv":
                setPublicacionesData(parsedData);
                break;
              case "PublicacionesProy.csv":
                setPublicacionesProyData(parsedData);
                break;
              default:
                break;
            }
          },
          header: true, // If your CSV has a header row
        });
      } else {
        alert("Seleccione un archivo CSV válido.");
      }
    }
  };

  const handlePrintData = () => {
    console.log("Investigadores Data:", investigadoresData);
    console.log("Investigadores Proy Data:", investigadoresProyData);
    console.log("Proyectos Data:", proyectosData);
    console.log("Publicaciones Data:", publicacionesData);
    console.log("Publicaciones Proy Data:", publicacionesProyData);

    // Aquí, envía los datos al backend Flask utilizando Axios
    axios.post("http://localhost:8080/admin/cargarDatos", {
        investigadoresData,
        investigadoresProyData,
        proyectosData,
        publicacionesData,
        publicacionesProyData
    })
    .then(response => {
      console.log("Datos enviados al backend con éxito:", response.data);
    })
    .catch(error => {
      console.error('Error al enviar datos al backend:', error);
    });
  };


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Ingresar Valores CSV</Card.Title>
              </Card.Header>
              <Card.Body>
                <input type="file" accept=".csv" onChange={handleFileChange} />
              </Card.Body>
              <Card.Body>
                <input type="file" accept=".csv" onChange={handleFileChange} />
              </Card.Body>
              <Card.Body>
                <input type="file" accept=".csv" onChange={handleFileChange} />
              </Card.Body>
              <Card.Body>
                <input type="file" accept=".csv" onChange={handleFileChange} />
              </Card.Body>
              <Card.Body>
                <input type="file" accept=".csv" onChange={handleFileChange} />
              </Card.Body>
              <Card.Footer>
                <Button onClick={handlePrintData}>Imprimir Datos</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CargarDatos;
