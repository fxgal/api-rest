const Pedidos = require('../models/Pedidos');


exports.add = async(req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({ mensaje: 'Pedido agregado', data: pedido });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.list = async(req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json({ mensaje: "Lista de Pedidos", data: pedidos });
    } catch (error) {
        console.log(error);
        next();
    }
}