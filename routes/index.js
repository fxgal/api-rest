const express = require('express');
const router = express.Router();

//Controllers
const ClientesController = require('../controllers/ClientesController');
const ProductosController = require('../controllers/ProductosController');

module.exports = function() {

    //Clientes
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

    //Productos
    //Agregar
    router.post('/productos',
        ProductosController.subirArchivo,
        ProductosController.add
    );
    //Lista
    router.get('/productos', ProductosController.list);
    //Por id
    router.get('/productos/:id', ProductosController.show);
    //Actualizar
    router.put('/productos/:id',
        ProductosController.subirArchivo,
        ProductosController.update
    );
    // //Eliminar
    router.delete('/productos/:id', ProductosController.delete);

    return router;
}