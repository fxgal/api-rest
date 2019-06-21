const Clientes = require('../models/Clientes');

exports.add = async (req, res) => {
  const cliente = new Clientes(req.body);

  try {
    await cliente.save();
    res.json({ mensaje: 'Nuevo cliente agregado', cliente });
  } catch (error) {
    res.json({ mensaje: 'Algo ha salido mal', error });
  }
};

exports.list = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json({ mensaje: 'Lista de clientes', clientes });
  } catch (error) {
    res.json({ mensaje: 'Algo ha salido mal', error });
    next();
  }
};

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cliente = await Clientes.findById(id);
    res.json({ mensaje: 'Cliente encontrado', cliente });
  } catch (error) {
    res.json({ mensaje: 'Algo ha salido mal', error });
    next();
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cliente = await Clientes.findByIdAndDelete(id);
    console.log(cliente);
    res.json({ mensaje: 'Cliente eliminado', status: 'success' });
  } catch (error) {
    res.json({ mensaje: 'Algo ha salido mal', error });
    next();
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await Clientes.findByIdAndUpdate(id, req.body, {
      new: true
    });
    res.json({
      mensaje: 'Cliente actualizado',
      data: cliente
    });
  } catch (error) {
    res.json({
      mensaje: 'Algo ha salido mal',
      data: error
    });
  }
};
