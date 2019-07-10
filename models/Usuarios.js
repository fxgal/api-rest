const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: 'Debes ingresar tu nombre'
  },
  password: {
    type: String,
    required: 'Debes ingresar una clave'
  }
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);
