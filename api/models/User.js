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
          type:'email'
      }      
  }    
    
};

