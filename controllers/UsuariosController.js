const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
  let usuario = new Usuarios(req.body);
  try {
    usuario.password = await bcrypt.hash(usuario.password, 5);
    const result = await usuario.save();
    res.json({ mensaje: 'Usuario registrado', result });
  } catch (error) {
    res.json({ mensaje: 'Usuario no registrado', error });
    next();
  }
};

exports.update = () => {};

exports.repass = () => {};

exports.recovery = () => {};

exports.auth = () => {};
