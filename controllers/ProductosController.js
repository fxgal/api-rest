const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

//Cargar imagenes
const configMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'));
        }
    }
}

//Pasar la configuracion y el campo
const upload = multer(configMulter).single('imagen');

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({ mensaje: 'Error al cargar imagen', data: error });
        }
        return next();
    });
}

//Agrega nuevos productos
exports.add = async(req, res, next) => {
    const producto = new Productos(req.body);
    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({ mensaje: 'Producto guardado', data: producto });
    } catch (error) {
        res.json({ mensaje: 'Algo ha salido mal', data: error });
        next();
    }
}

// Lista de productos

exports.list = async(req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json({
            mensaje: 'Lista de productos',
            data: productos
        });
    } catch (error) {
        res.json({
            mensaje: 'Algo ha salido mal',
            data: error
        });
        next();
    }
}

// Produto por id
exports.show = async(req, res, next) => {
    try {
        const id = req.params.id;
        const producto = await Productos.findById(id);
        res.json({
            mensaje: 'Producto encontrado',
            data: producto
        });
    } catch (error) {
        res.json({
            mensaje: 'Algo ha salido mal',
            data: error
        });
        next();
    }
}

//Agrega nuevos productos
exports.update = async(req, res, next) => {

    try {
        //Productos recibido
        let datos = req.body;
        let productoActual = Productos.findById(req.params.id);
        if (req.file) {
            datos.imagen = req.file.filename;
            let urlImagen = __dirname + `/../uploads/${productoActual.imagen}`;
            if (fs.existsSync(urlImagen)) {
                fs.unlink(urlImagen, (error) => {
                    if (error) {
                        console.log('Imagen no eliminada', error);
                    }
                });
            }
        } else {
            datos.imagen = productoActual.imagen;
        }
        let producto = await Productos.findByIdAndUpdate(
            req.params.id,
            datos, {
                new: true
            });
        await producto.save();
        res.json({
            mensaje: 'Producto actualizado',
            data: producto
        });
    } catch (error) {
        res.json({
            mensaje: 'Algo ha salido mal',
            data: error
        });
        next();
    }
}

//Eliminar producto
exports.delete = async(req, res, next) => {
    try {
        const id = req.params.id;
        const producto = await Productos.findByIdAndDelete(id);
        let urlImagen = __dirname + `/../uploads/${producto.imagen}`;
        if (fs.existsSync(urlImagen)) {
            fs.unlink(urlImagen, (error) => {
                if (error) {
                    console.log('Imagen no eliminada', error);
                }
            });
        }
        res.json({
            mensaje: 'Producto eliminado'
        });
    } catch (error) {
        res.json({
            mensaje: 'Algo ha salido mal',
            data: error
        });
        next();
    }
}