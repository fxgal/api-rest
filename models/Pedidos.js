const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidosSchema = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: 'Clientes'
  },
  pedido: [
    {
      producto: {
        type: Schema.ObjectId,
        ref: 'Productos'
      },
      nombre: String,
      precio: Number,
      cantidad: Number
    }
  ],
  total: {
    type: Number
  }
});

module.exports = mongoose.model('Pedidos', PedidosSchema);
