/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt=require('bcrypt')
module.exports = {
	new:function(req,res){
        res.view()
    },
    create:function(req,res,next){
        var username=req.param('username');
        var password=req.param('password');
        if(!username || !password){
            var noUsernameOrPassword=[{
                message:'Debe de ingresar un usuario y contraseña'
            }]
            req.session.flash={
                err:noUsernameOrPassword,user:{username:username}
            }
            return res.redirect('/session/new')
        }
        User.findOneByUsername(username,function(err,user){
            if(err){
                req.session.flash={
                    err:err,user:{username:username}
                }
                return res.redirect('/session/new')
            }
            if(!user){
                var noUsername=[{
                    message:'El usuario no fue encontrado'
                }]
                req.session.flash={
                    err:noUsername,user:{username:username}
                }
                return res.redirect('/session/new')
            }
            bcrypt.compare(password, user.password, function(err, valid) {
              if(err){
                    req.session.flash={
                        err:err,user:{username:username}
                    }
                    return res.redirect('/session/new')
               }
               if(!valid){
                    var passwordDoNotMatchError=[{message:'La Contrase{a no coincide}'}] 
                    req.session.flash={
                        err:passwordDoNotMatchError,user:{username:username}
                    }
                    return res.redirect('/session/new')
               }
                req.session.authenticated=true
                req.session.User=user
                res.redirect('/user/show/'+user.id)
            })
        })
    },
    destroy:function(req,res,next){
        req.session.destroy()
        res.redirect('/session/new')
    }
};

