import cargarDatos from "views/cargarDatos.js";
import TableList from "views/Consultas.js";
import mProyecto from "views/mProyecto.js"
import mInvesgadores from "views/mInvestigadores.js"
import mPublicaciones from "views/mPublicaciones.js"
import asoInvest from "views/asoInvest.js"
import asoArticulo from "views/asoArticulo.js"
import Cookies from 'js-cookie';
const valorCookie = Cookies.get('tipoHidden');

const dashboardRoutes = [
  {
    path: "/cargarDatos",
    name: "Cargar Datos",
    icon: "nc-icon nc-chart-pie-36",
    component: cargarDatos,
    layout: "/admin",
    hidden: 'true'
  },
  {
    path: "/MantenimientoProyectos",
    name: "Mantenimiento proyectos",
    icon: "nc-icon nc-settings-tool-66",
    component: mProyecto,
    layout: "/admin",
    hidden: valorCookie
  },
  {
    path: "/MantenimientoInvestigadores",
    name: "Mantenimiento investigadores(as)",
    icon: "nc-icon nc-badge",
    component: mInvesgadores,
    layout: "/admin",
    hidden: valorCookie
  },
  {
    path: "/MantenimientoPublicaciones",
    name: "Mantenimiento publicaciones",
    icon: "nc-icon nc-paper-2",
    component: mPublicaciones,
    layout: "/admin",
    hidden: valorCookie
  },
  {
    path: "/AsociarArtículo",
    name: "Asociar artículo",
    icon: "nc-icon nc-tag-content",
    component: asoArticulo,
    layout: "/admin",
    hidden: valorCookie
  },
  {
    path: "/AsociarInvestigador",
    name: "Asociar investigador(a)",
    icon: "nc-icon nc-tag-content",
    component: asoInvest,
    layout: "/admin",
    hidden: valorCookie
  },
  {
    path: "/Consultas",
    name: "Consultas",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
    hidden: valorCookie
  }
];

export default dashboardRoutes;
