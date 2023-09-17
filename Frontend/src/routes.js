/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import TableList from "views/Consultas.js";
import mProyecto from "views/mProyecto.js"
import mInvesgadores from "views/mInvestigadores.js"
import mPublicaciones from "views/mPublicaciones.js"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Cargar Datos",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/MantenimientoProyectos",
    name: "Mantenimiento proyectos",
    icon: "nc-icon nc-circle-09",
    component: mProyecto,
    layout: "/admin"
  },
  {
    path: "/MantenimientoInvestigadores",
    name: "Mantenimiento investigadores/as",
    icon: "nc-icon nc-circle-09",
    component: mInvesgadores,
    layout: "/admin"
  },
  {
    path: "/MantenimientoPublicaciones",
    name: "Mantenimiento publicaciones",
    icon: "nc-icon nc-circle-09",
    component: mPublicaciones,
    layout: "/admin"
  },
  {
    path: "/AsociarArtículo",
    name: "Asociar artículo",
    icon: "nc-icon nc-circle-09",
    component: mPublicaciones,
    layout: "/admin"
  },
  {
    path: "/AsociarInvestigador",
    name: "Asociar investigador(a)",
    icon: "nc-icon nc-circle-09",
    component: mPublicaciones,
    layout: "/admin"
  },
  {
    path: "/Consultas",
    name: "Consultas",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  }
];

export default dashboardRoutes;
