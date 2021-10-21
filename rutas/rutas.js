const express = require('express')
const rutas = express.Router();
const controller = require('../controlador/controller')

rutas.get('/',controller.index);
rutas.post('/login',controller.login);
rutas.get('/consultar',controller.consultageneral);
rutas.post('/frminsertar',controller.insertar);
rutas.get('/cliente',controller.cliente);
rutas.post('/actlineas', controller.actlineas)
rutas.get('/cuentasconsultar', controller.consultalinea);
rutas.get('/automoviles',controller.automoviles);
rutas.get('/camionetas',controller.camionetas);
rutas.get('/campers',controller.campers);
rutas.get('/todosuno',controller.todosuno);
rutas.get('/todos',controller.consultodos);
rutas.post('/frminsertart',controller.insertartodos);
rutas.post('/frminsertartan', controller.insertartran)
rutas.get('/registrarve', controller.consultatran)
rutas.get('/registrarve', controller.registrarve)
rutas.post('/frminsertarpre', controller.insertarprec)
rutas.get('/precio', controller.consulprec)
rutas.get('/todoscm', controller.consultacuentas)
rutas.get('/precio',controller.precio);
rutas.get('/consultaprecios',controller.consultagl);
module.exports = rutas;
