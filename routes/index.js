const express = require('express');
const router = express.Router();

//Controllers
const ClientesController = require('../controllers/ClientesController');
const ProductosController = require('../controllers/ProductosController');
const PedidosController = require('../controllers/PedidosController');
const UsuariosController = require('../controllers/UsuariosController');

module.exports = function() {
  //---------------->Clientes
  //Agregar
  router.post('/clientes', ClientesController.add);
  //Lista
  router.get('/clientes', ClientesController.list);
  //Por id
  router.get('/clientes/:id', ClientesController.show);
  //Eliminar
  router.delete('/clientes/:id', ClientesController.delete);
  //Actualizar
  router.put('/clientes/:id', ClientesController.update);

  //---------------->Productos
  //Agregar
  router.post(
    '/productos',
    ProductosController.subirArchivo,
    ProductosController.add
  );
  //Lista
  router.get('/productos', ProductosController.list);
  //Busqueda
  router.get('/productos/search/:search', ProductosController.searcher);
  //Por id
  router.get('/productos/:id', ProductosController.show);
  //Actualizar
  router.put(
    '/productos/:id',
    ProductosController.subirArchivo,
    ProductosController.update
  );
  // //Eliminar
  router.delete('/productos/:id', ProductosController.delete);

  //----------------->Pedidos
  //Agregar
  router.post('/pedidos', PedidosController.add);
  //Lista
  router.get('/pedidos', PedidosController.list);
  //Por id
  router.get('/pedidos/:id', PedidosController.show);
  //Actualizar pedido
  router.put('/pedidos/:id', PedidosController.update);
  //Eliminar pedido
  router.delete('/pedidos/:id', PedidosController.delete);

  //---------------->Usuarios
  router.post('/usuarios', UsuariosController.register);

  return router;
};
