/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  //Se nombran los atributos para User
  attributes: {
      name:{
          type:'string',
          required:true
      },
      lastname:{
          type:'string',
          required:true
      },
      username:{
          type:'string',
          required:true,
          unique:true
      },
      email:{
          type:'email',required:true,unique:true
      },
      password:{
          type:'string',required:true
      },
      passwordConfirmation:{
          type:'string',required:true
      }
  },
  beforeCreate: function (values, next) {
    var password=values.password
    var passwordConfirmation=values.passwordConfirmation
    //Validate of password
    if(!password || !passwordConfirmation || password!=passwordConfirmation){
        var passwordDoesNotMatchError=[{
            name:'passwordDoesNotMatchError',message:'Las contraseñas deben de coincidir'
        }]
        return next({
            err:passwordDoesNotMatchError
        })
    }
    // Hash password
    require('bcrypt').hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      values.passwordConfirmation=hash;
      //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
      next();
    });
  }
    
};

