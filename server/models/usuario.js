const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es role valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String,
        required: [false, 'La imagen no es obligatoria']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//usuarioSchema.methods.toJSON = funtion() {
//  let user = this;
//let userObject = user.toObject();
//delete userObject.password;
//return userObject;
//}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico, mensaje desde validacion'
});

module.exports = mongoose.model('Usuario', usuarioSchema);