require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');

//parse aplicacion/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse applicatios/json
app.use(bodyParser.json({ type: 'application/*+json' }))

// configuracion global de rutas
app.use(require('./routes/index'));







mongoose.connect(process.env.urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINEEE');
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})