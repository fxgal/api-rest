const Pedidos = require('../models/Pedidos');

exports.add = async (req, res, next) => {
  const pedido = new Pedidos(req.body);
  try {
    await pedido.save();
    res.json({ mensaje: 'Pedido agregado', pedido });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.list = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({})
      .populate('cliente')
      .populate({
        path: 'pedido.producto',
        model: 'Productos'
      });
    res.json({ mensaje: 'Lista de Pedidos', pedidos });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.show = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findById(req.params.id)
      .populate('cliente')
      .populate({
        path: 'pedido.producto',
        model: 'Productos'
      });

    if (!pedido) {
      res.json({ mensaje: 'Pedido no existe' });
      return next();
    }
    res.json({ mensaje: 'Detalles del pedido', pedido });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.update = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json({ mensaje: 'Pedido actualizado', pedido });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.delete = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Pedido eliminado', pedido });
  } catch (error) {
    console.log(error);
    return next();
  }
};
