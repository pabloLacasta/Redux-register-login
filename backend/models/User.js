const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const SECRET_AUTH_JWT = require( '../config/password' ).SECRET_AUTH_JWT;

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        maxlength: 40,
    },
   
    email: {
        type: String,
        unique: true,
        required: true,
    },
   
    password: {
        type: String,
        minlength: 8,
        required: true,
    },

    profilePhoto: {
        type: String,
    },

    coverPhoto: {
        type: String
    },
    
    
    tokens:[{//array de tokens
        token: {//string del jsonwt
            type: String,
            required: true,
        },
        type:{//string que indica el tipo de token, por ejemplo 'auth'
            type:String,
            required:true
        }
    }]},
{
    timestamps: true//cada cez que creas un nuevo documento o lo modificas le pone la fecha (createdAt, updatedAt)
} );

userSchema.methods.toJSON = function () {//Modificamos el JSON para que cuando mandemos el usuario al frontend no se envíe la password
    //Usamos la función de ES5 porque si no el .this nos daría null
    const user = this._doc;//el JSON de mongoose tiene muchas cosas internas, entre ellas el _doc, que contiene los datos del usuario que nos interesan
    delete user.password;
    delete user.tokens; //eliminamos los tokens también, para no enviar al frontend todos los tokens del usuario
    return user;
}

userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({_id:user._id}, SECRET_AUTH_JWT, {expiresIn:'7d'})//Generamos el token con el secret
    user.tokens = [...user.tokens, {token, type:'auth'}]//añadimos el token a a la array de tokens del usuario
    return user.save().then(()=>token)//guarda el usuario actualizado con el nuevo token en la base de datos y devuelve unapromesa con el token. Con el endpoint lo mandaremos al frontend y desde el frontend lo guardaremos en la local storage para que se guarde la sesión
    .catch(console.log);
}

// userSchema.pre('save',  function (next) { // .pre es middleware de mongoose  ( middleware es algo  que se ejecuta entre req y res), se ejecuta en cada 'save'. Se llama así porque se ejecuta antes de hacer el save
//     const user = this; //utilizamos function de ES5 para acceder al this, que es lo que hay en el new userModel de users.js, en este caso el req.body, que es lo que hemos escrito en el formulario
//     if (user.isModified('password')) { //condicionamos a que el password haya sido cambiado
//       bcrypt.genSalt(9)
//   .then(salt => bcrypt.hash(user.password, salt) // generamos el salt y generamos el hash con el password en texto plano y  el salt
//   .then(hash => { //enchoriza la contraseña
//         user.password = hash;  // asignamos el hash como campo password antes de guardar en la base de datos
//         return next(); //damos paso a la función save() del model de mongoose, es decir, guardamos la contraseña encriptada
//       }).catch(err => next(err))).catch(err => next(err)) //capturamos errores de haberlos
//     } else next(); //sino ha sido modificado el password pasa al save directamente
//   });

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;