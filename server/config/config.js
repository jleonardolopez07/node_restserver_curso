// =================================
// puerto
// ==================================
process.env.PORT = process.env.PORT || 3000;

// =================================
// Entorno
// ==================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================================
// Bases de Datos
// ==================================

let urlDB;

//if (process.env.NODE_ENV === 'dev') {
//  urlDB = 'mongodb://localhost:27017/cafe';
//} else {
urlDB = 'mongodb+srv://strider:JSAYZrUxesTCSkCI@cluster0.9kfoy.mongodb.net/cafe'
    //}
process.env.urlDB = urlDB;