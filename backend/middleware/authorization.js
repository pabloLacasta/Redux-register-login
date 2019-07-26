const jwt = require('jsonwebtoken');
const SECRET_AUTH_JWT = require('../config/password.js').SECRET_AUTH_JWT;
const UserModel = require('../models/User.js');

const authorization = async ( req, res, next ) => {
    try {
        const authToken = req.headers.Authenticate
        console.log(req.headers)
        const { _id } = jwt.verify( authToken, SECRET_AUTH_JWT );

        const user = await UserModel.findOne( {
            _id,
            tokens: {
                $elemMatch: {
                    type: 'auth',
                    token: authToken
                }
            }
        } )
        if ( !user ) throw new Error( 'Invalid User provided by the JWT' )
        req.user = user;
        next();
    } catch ( err ) {
        res.status( 401 ).send( err.message )
    }
}

module.exports = authorization;