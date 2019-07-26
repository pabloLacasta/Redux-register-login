const router = require('express').Router();
const UserModel = require('../models/User');
const isAuthenticated = require ('../middleware/isAuthenticated.js')
const authorization = require ('../middleware/authorization.js')


router.post('/register', async (req, res) => {
    try {
        const user = await new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profilePhoto: '/images/default-profile-image.png',
            coverPhoto: '/images/background-profile-auto.jpg'
        }).save();
        const token = await user.generateAuthToken();//ejecutamos el metodo que gnera un token al usuario. Pero esperamos a ue llegue el token generado
        res.status(201).send({
            info: `¡Bienvenido ${user.name}!`,
            user,
            token//enviamos el token generado al frontend
        })
        console.log(user)
    } catch (error) {
        console.log(error)
    }
});



router.get( '/logout', authorization, ( req, res ) => {

    const tokens = req.user.tokens.filter( token => token.type !== 'auth' ); //esto quitaría todos los tokens de tipo auth
    UserModel.findByIdAndUpdate( req.user._id, { tokens }, { new: true, useFindAndModify: false } )//en req.user esta la información del usuario que se guardo desde el middleware
        .then( () => res.status( 200 ).json( { message: 'You have been successfully logged out' } ) )
        .catch( error => res.status( 500 ).json( { error, message: 'Something went wrong, our apologies' } ) );
} );

router.get('/all', async (req,res)=>{
    try {
        const users = await UserModel.find({})
        res.send(users);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.patch('/updateName', isAuthenticated,   (req,res)=>{//Patch es método de http para actualizar. Put también está, pero cambia absolutamente todo, mientras que patch solo lo que le digas
    const dataUser = req.body;
    try {
        const user =  UserModel.findByIdAndUpdate(req.user._id, {name:dataUser.name}, {new:true});
        
        res.send(user.name)
        console.log(user)
    } catch (error) {
        
    }
})

module.exports = router;