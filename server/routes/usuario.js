const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const bodyParser = require('body-parser');
const Usuario = require('../models/usuario.js');
const { verificaToken, verificacion_Role } = require('../middlewares/autenticacion')
const { findLastIndex } = require('underscore');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('/usuario', verificaToken, (req, res) => {
    //  res.json('get usuario Local');


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                });

            })
        })
});

app.post('/usuario', [verificaToken, verificacion_Role], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.delete('/usuario/:id', [verificaToken, verificacion_Role], (req, res) => {
    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    };


    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB

        });
    });
});




//app.delete('/usuario/:id', function(req, res) {
//   let id = req.params.id;
//  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
//
//     if (!usuarioBorrado) {
//         return res.status(400).json({
//            ok: false,
//            err: {
//                message: 'Usuario no encontrado'
//           }
//       });
//   };

//   res.json({
//      ok: true,
//       usuario: usuarioBorrado
//   });
// });
//});

app.put('/usuario/:id', [verificaToken, verificacion_Role], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB

        });
    });
});

module.exports = app;