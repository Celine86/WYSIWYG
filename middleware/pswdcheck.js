const pswdCheck = require('password-validator');
const pswdModel = new pswdCheck();

pswdModel
.is().min(12)                                    
.is().max(48)                                  
.has().uppercase(1)                              
.has().lowercase(1)                              
.has().digits(1)
.has().symbols(1)                                     

module.exports = (req, res, next) => {
    if (!pswdModel.validate(req.body.password)) {
        res.status(401).json({error:'Le mot de passe doit contenir au moins 12 caractères avec une majuscule, une minuscule, un chiffre et un caractère spécial'})
    } else {
        next();
    }
};