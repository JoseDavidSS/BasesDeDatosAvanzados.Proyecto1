import React, { useState, useEffect } from "react";
import axios from "axios";
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
  //Post   
  //Busqueda de un(a) investigador(a)
  const [NombreInv, setNombreInv] = useState([]);
  const [BuscarNombreInvestigadorID, setBuscarNombreInvestigadorID] = useState("");
  const [infoInv, setinfoInv] = useState([]);
  const [infoProyectosInv, setinfoProyectosInv] = useState([]);
  //Busqueda de un proyecto
  const [NombreProyecto, setNombreProyecto] = useState([]);
  const [BuscarNombreProyectoID, setBuscarNombreProyectoID] = useState("");
  const [infoNombreProyecto, setinfoNombreProyecto] = useState([]);
  const [infoNombreInv, setinfoNombreInv] = useState([]);
  const [infoNombreArticulo, setinfoNombreArticulo] = useState([]);

  //Búsqueda de publicaciones
  const [DatosPublicaciones, setDatosPublicaciones] = useState([]);
  const [BuscarNombrePublicacionID, setBuscarNombrePublicacionID] = useState([]);
  const [infoPubl, setinfoPubl] = useState([]);
  const [infoPublProy, setinfoPublProy] = useState([]);

  //Búsqueda por área de conocimiento
  const [BuscarAreaConocimientoID, setBuscarAreaConocimientoID] = useState("");
  const [AreaConocimiento, setAreaConocimiento] = useState([]);
  const [infoACProy, setinfoACProy] = useState([]);
  const [infoACPubl, setinfoACPubl] = useState([]);

  //Busqueda de colegas
  const [infoColega, setinfoColegas] = useState([]);
  const [BuscarNombrePublicacion, setBuscarNombrePublicacion] = useState([]);
  const [tipoConsulta, setTipoConsulta] = useState('1');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Get
  const [TopAreasConocimiento, setTopAreasConocimiento] = useState([]);
  const [TopInstituciones, setTopInstituciones] = useState([]);
  const [TopInvestigadores, setTopInvestigadores] = useState([]);
  
  ///////////////////////// Busqueda de un(a) investigador(a)
  const handleNombreInvestigadorChange = (e) => {
    setBuscarNombreInvestigadorID(e.target.value);
  };
  const handleObtenerInv = () => {
    // Realiza una solicitud GET al backend para obtener datos
    axios.get("http://localhost:8080/admin/Consultas")
    .then(response => {
      // En este punto, `response.data` contiene los datos recibidos del backend
      const nombres = response.data[0].map(({nombreC,idInv}) => ({
        nombreC,
        idInv
      }));
      setNombreInv(nombres)
    })
    .catch(error => {
      console.error('Error al obtener datos del backend:', error);
    });
  };
  ///////////////////////// Búsqueda de un proyecto
  const handleObtenerProy = () => {
    // Realiza una solicitud GET al backend para obtener datos
    axios.get("http://localhost:8080/admin/Consultas")
    .then(response => {
      // En este punto, `response.data` contiene los datos recibidos del backend
      const nombres = response.data[1].map(({tituloPr,idPr}) => ({
        tituloPr,
        idPr
      }));
      setNombreProyecto(nombres)
    })
    .catch(error => {
      console.error('Error al obtener datos del backend:', error);
    });
  };
  ///////////////////////// Búsqueda de publicaciones
  const handleObtenerPubli = () => {
    // Realiza una solicitud GET al backend para obtener datos
    axios.get("http://localhost:8080/admin/Consultas")
    .then(response => {
      // En este punto, `response.data` contiene los datos recibidos del backend
      const datos = response.data[2].map(({idPu,tituloPu}) => ({
        idPu,
        tituloPu
      }));
      setDatosPublicaciones(datos);
    })
    .catch(error => {
      console.error('Error al obtener datos del backend:', error);
    });
  };
  ///////////////////////// Búsqueda por área de conocimiento
  const handleObtenerAreaConocimiento = () => {
    // Realiza una solicitud GET al backend para obtener datos
    axios.get("http://localhost:8080/admin/Consultas")
    .then(response => {
      // En este punto, `response.data` contiene los datos recibidos del backend
      setAreaConocimiento(response.data[3])
    })
    .catch(error => {
      console.error('Error al obtener datos del backend:', error);
    });
  };
  /////////////////////////
  useEffect(() => {
    console.log('Valor seleccionado:', tipoConsulta);
    if (tipoConsulta === "4") {
      handleObtenerInv();
    }if(tipoConsulta === "5"){
      handleObtenerProy();
    }if(tipoConsulta === "6"){
      handleObtenerPubli();
    }if(tipoConsulta === "7"){
      handleObtenerAreaConocimiento();
    }
    else {
      handleObtenerInv();
    }
  }, [tipoConsulta]);

  const handleBuscarConsulta = () => {
    // Aquí, envía los datos al backend Flask utilizando Axios
    axios.post("http://localhost:8080/admin/Consultas", {
      tipoConsulta,
      BuscarNombreInvestigadorID,
      BuscarNombreProyectoID,
      BuscarAreaConocimientoID,
      BuscarNombrePublicacionID
    })
    .then(response => {
      if (tipoConsulta === "1") {
        setTopAreasConocimiento(response.data.resultados);
      }if(tipoConsulta === "2"){
        setTopInstituciones(response.data.resultados);
      }if(tipoConsulta === "3"){
        setTopInvestigadores(response.data.resultados);
      }if(tipoConsulta === "4"){
        const { investigador, proyectos_afiliados } = response.data.resultados;
        setinfoInv(investigador);
        setinfoProyectosInv(proyectos_afiliados);
      }if(tipoConsulta === "5"){
        const { proyecto, investigadores,publicaciones } = response.data.resultados;
        setinfoNombreProyecto(proyecto);
        setinfoNombreInv(investigadores);
        setinfoNombreArticulo(publicaciones);     
      }if(tipoConsulta === "6"){
        const { publicaciones,proyectos } = response.data.resultados;
        setinfoPubl(publicaciones);
        setinfoPublProy(proyectos);
      }
      if(tipoConsulta === "7"){
        const { publicaciones, proyectos } = response.data.resultados; 
        setinfoACProy(proyectos),
        setinfoACPubl(publicaciones);
      }if(tipoConsulta === "8"){
        const { investigador, colegas } = response.data.resultados;
        setinfoInv(investigador);
        setinfoColegas(colegas);
      }
      console.log("Resultados almacenados en la lista:", response.data.resultados);
    })
    .catch(error => {
      console.error('Error al enviar datos al backend:', error);
    });
  };
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
            <Button className="btn-fill" variant="info"  onClick={handleBuscarConsulta}> Buscar</Button>
          </Col>
          {(tipoConsulta === "4") &&(
            <Col md="6" className="d-flex align-items-end justify-content-start">
              <Form.Group>
              <br /> {/* Salto de línea */}
                <Form.Label>Investigadores(as)</Form.Label>
                <Form.Control
                  as="select"
                  value={BuscarNombreInvestigadorID}
                  onChange={handleNombreInvestigadorChange}
                >
                  {NombreInv.map(({ nombreC, idInv }) => (
                    <option key={idInv} value={idInv}>
                      {nombreC}
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
                <Form.Control
                  as="select"
                  value={BuscarNombreProyectoID}
                  onChange={(e) => setBuscarNombreProyectoID(e.target.value)}
                >
                  {NombreProyecto.map(({ tituloPr, idPr }) => (
                    <option key={idPr} value={idPr}>
                      {tituloPr}
                    </option>
                  ))}
                </Form.Control>
            </Form.Group>
          </Col>
          )}
          {(tipoConsulta === "6") &&(
            <Col md="6" className="d-flex align-items-end justify-content-start">
              <Form.Group>
                <br /> {/* Salto de línea */}
                <Form.Label>Publicaciones</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={BuscarNombrePublicacionID}
                  style={{ height: '300px', width: '600px'}}
                  onChange={(e) => setBuscarNombrePublicacionID(Array.from(e.target.selectedOptions, (option) => option.value))}
                >
                  {DatosPublicaciones.map(({ tituloPu, idPu }) => (
                    <option key={idPu} value={idPu}>
                      {tituloPu}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          )}
          {(tipoConsulta === "7") &&(
            <Col md="6" className="d-flex align-items-end justify-content-start">
              <Form.Group>
              <br /> {/* Salto de línea */}
                <Form.Label>Areas de conocimiento</Form.Label>
                  <Form.Control as="select"
                    value={BuscarAreaConocimientoID} 
                    onChange={(e) => setBuscarAreaConocimientoID(e.target.value)}> 
                    {AreaConocimiento.map((BuscarAreaConocimientoID) => (
                    <option key={BuscarAreaConocimientoID} value={BuscarAreaConocimientoID}>
                        {BuscarAreaConocimientoID}
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
                <Form.Label>Investigadores(as)</Form.Label>
                  <Form.Control
                    as="select"
                    value={BuscarNombreInvestigadorID}
                    onChange={handleNombreInvestigadorChange}
                  >
                    {NombreInv.map(({ nombreC, idInv }) => (
                      <option key={idInv} value={idInv}>
                        {nombreC}
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
                    {TopAreasConocimiento.map((item, index) => (
                      <tr key={index}>
                        <td>{item.area}</td>
                        <td>{item.contador}</td>
                      </tr>
                    ))}
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
                    {TopInstituciones.map((item, index) => (
                      <tr key={index}>
                        <td>{item.institucion}</td>
                        <td>{item.num_proyectos}</td>
                      </tr>
                    ))}
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
                    {TopInvestigadores.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nombre_completo}</td>
                        <td>{item.institucion}</td>
                        <td>{item.num_proyectos}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}
        {tipoConsulta === "4" &&(
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
                    {infoInv.map((item, index) => (
                      <tr key={index}>
                        <td>{BuscarNombreInvestigadorID}</td>
                        <td>{item.nombreCompleto}</td>
                        <td>{item.tituloAcademico}</td>
                        <td>{item.institucion}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
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
                    {infoProyectosInv.map((item, index) => (
                      <tr key={index}>
                        <td>{item.idProyecto}</td>
                        <td>{item.tituloProyecto}</td>
                        <td>{item.annoInicio}</td>
                        <td>{item.duracionMeses}</td>
                        <td>{item.areaConocimiento}</td>
                      </tr>
                    ))}
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
                    {infoNombreProyecto.map((item, index) => (
                      <tr key={index}>
                        <td>{BuscarNombreProyectoID}</td>
                        <td>{item.tituloProyecto}</td>
                        <td>{item.annoInicio}</td>
                        <td>{item.duracionMeses}</td>
                        <td>{item.areaConocimiento}</td>
                      </tr>
                    ))}
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
                    {infoNombreInv.map((item, index) => (
                      <tr key={index}>
                        <td>{item.idInvestigador}</td>
                        <td>{item.nombreCompleto}</td>
                        <td>{item.tituloAcademico}</td>
                        <td>{item.institucion}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
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
                    {infoNombreArticulo.map((item, index) => (
                      <tr key={index}>
                        <td>{item.idPub}</td>
                        <td>{item.titulo_publicacion}</td>
                        <td>{item.anno_publicacion}</td>
                        <td>{item.nombre_revista}</td>
                      </tr>
                    ))}
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
                <Card.Title as="h4">Informacion de publicaciones </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID Publicación</th>
                      <th>Título Publicación</th>
                      <th>Año de Publicación</th>
                      <th>Nombre de la Revista</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infoPubl.map((item, index) => (
                      <tr key={index}>
                        <td>{item[0]}</td>
                        <td>{item[3]}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Card.Header>
                  <Card.Title as="h4"> Información de Proyectos Relacionados </Card.Title>
                </Card.Header>
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Título del Proyecto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infoPublProy.map((item, index) => (
                      <tr key={index}>
                        <td>{item}</td>
                      </tr>
                    ))}
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
                <Card.Title as="h4">Nombre de la area: {BuscarAreaConocimientoID}</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Nombre de proyectos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infoACProy.map((item, index) => (
                      <tr key={index}>
                        <td>{item}</td>
                      </tr>
                    ))}
                  </tbody>
                  <thead>
                    <tr>
                      <th className="border-0">Publicaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infoACPubl.map((item, index) => (
                      <tr key={index}>
                        <td>{item}</td>
                      </tr>
                    ))}
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
                <Card.Title as="h4">Investigador(a)</Card.Title>
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
                    {infoInv.map((item, index) => (
                      <tr key={index}>
                        <td>{BuscarNombreInvestigadorID}</td>
                        <td>{item.nombreCompleto}</td>
                        <td>{item.tituloAcademico}</td>
                        <td>{item.institucion}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
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
                      <th className="border-0">ID</th>
                      <th className="border-0">Nombre completo</th>
                      <th className="border-0">Titulo academinco</th>
                      <th className="border-0">Institución en la cual labora</th>
                      <th className="border-0">Correo electronico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infoColega.map((item, index) => (
                      <tr key={index}>
                        <td>{item.idColega}</td>
                        <td>{item.nombreCompleto}</td>
                        <td>{item.tituloAcademico}</td>
                        <td>{item.institucion}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
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