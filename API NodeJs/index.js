//Variables base de datos
var mariaDB = require('mysql');
//Lista de consultas

//import {SubscribeCommand } from "@aws-sdk/client-sns";
//var snsClient  = require("./node_modules/@aws-sdk/client-sns/dist-cjs/snsClient.js");


//Variables para cargar pagina
const http = require("http");
const host = "localhost";
const ports = 8000;
const fs = require('fs');

//Variables para peticiones
const express = require('express');
const app = express();
var https = require("http");
var hostname = "localhost";
var puerto = 9000;
var cors = require('cors');
const { text } = require('express');

//Variable para conectar con AWS
var AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var key = {
  cognito:{
      UserPoolId: 'us-east-1_9DnVMOsf1',
      ClientId: '42vqq52csc1gieneis6pu6oavq',
  }
}
var cognito = new AmazonCognitoIdentity.CognitoUserPool(key.cognito);

//Variable de cifrado
var md5 = require('md5');
const { format } = require('path');

//VARIABLES de base de datos
//Conexion base
try {
    var con = mariaDB.createConnection({
      host: "practica1-db.ck2ohvwezg5m.us-east-1.rds.amazonaws.com",
      user: "admin",
      password: "admin1234",
      database: "practica1",
      port: 3306
    })
  
    con.connect(function (error) {
      if (error) {
        throw error;
      } else {
        console.log('Conexion correcta.');
      }
    });
} catch (error) {
    console.log("Se desconecto de la base de datos.");
}

function Login(){
        app.post("/login", async (req, res) => {
          var datos = req.body;
          var usuario = datos.user;
          var pass = datos.password;
          console.log(datos)
          
          pass = md5(pass) 
          
          var authenticationData = {
              Username: usuario,
              Password: pass + "D**"
          };
          var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
              authenticationData
          );
          var userData = {
              Username: usuario,
              Pool: cognito,
          };
          var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
          cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
        
          cognitoUser.authenticateUser(authenticationDetails, {
              onSuccess: function (result) {
                  // User authentication was successful
                  res.json({alerta: true, mensaje: "Bienvenido al sistema "+usuario}); //
                  
              
                },
              onFailure: function (err) {
                  // User authentication was not successful
                  res.json({alerta: false, mensaje: "No se puedo iniciar sesion, descripcion: " + err});
              },
              mfaRequired: function (codeDeliveryDetails) {
                  // MFA is required to complete user authentication.
                  // Get the code from user and call
                  cognitoUser.sendMFACode(verificationCode, this);
              },
          });
        });
}

function Registrar(){
    app.post("/registrar", async (req, res) => {
      var attributelist = [];
      var datos = req.body;
      var usuario = datos.user;
      var nombre = datos.name;
      var email = datos.email;
      var pass = datos.password;
      var foto = datos.foto;
      console.log("Usuario: " + usuario)
      console.log("nombre: " + nombre)
      console.log("email: " + email)
      console.log("pass: " + pass)
      

      var dataname = {
          Name: 'name',
          Value: nombre,
      };
      var attributename = new AmazonCognitoIdentity.CognitoUserAttribute(dataname);
    
      attributelist.push(attributename);
    
      var dataemail = {
          Name: 'email',
          Value: email,
      };
      var attributeemail = new AmazonCognitoIdentity.CognitoUserAttribute(dataemail);
    
      attributelist.push(attributeemail);

          var contador = 0
          //Generamos un codigo hash unico por usuario. como no pueden haber 2 usuarios llamados igual aplica correctamente.
          var string = usuario
          for (i = 0 ;i<string.length ; i++)
          {
              ch = string.charCodeAt(i);
              contador = ((contador << 5) - contador) + ch;
              contador = contador & contador;
          }
          //Agregar la foto al bucket
          //Contruimos para agregar la foto;
          var id = "foto" + contador + "_" + usuario;
          //Primero hay que guardar la foto del perfil.
          var nombrei = "Fotos_Perfil/" + id + ".jpg"; // fotos -> se llama la carpeta
          var nombreCompleto = "http://practica1-g9-imagenes.s3.amazonaws.com/"+nombrei;
          console.log(nombrei);
          //se convierte la base64 a bytes          
          let buff = new Buffer.from(foto, 'base64');
          AWS.config.update({
            region: 'us-east-1', // se coloca la region del bucket 
            accessKeyId: 'AKIA5DGZNJHPSPFRHSGF',
            secretAccessKey: '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'
          });
          var s3 = new AWS.S3(); // se crea una variable que pueda tener acceso a las caracteristicas de S3
          // metodo 1
          const params = {
            Bucket: "practica1-g9-imagenes",
            Key: nombrei,
            Body: buff,
            ContentType: "image"
          };
          s3.putObject(params).promise();


      var datafoto = {
          Name: 'custom:foto',
          Value: nombreCompleto+"",
      };
      var attributefoto = new AmazonCognitoIdentity.CognitoUserAttribute(datafoto);
    
      attributelist.push(attributefoto);
    
      pass = md5(pass)

      //Guardar en la base de datos.
      try {
        consultar = "INSERT INTO Usuario(usuario,password,nombre,foto,puntos) VALUES(\""+usuario+"\",\""+pass+"\",\""+nombre+"\",\""+nombreCompleto+"\",0);";
        console.log(consultar);
        try{
          var query = con.query(consultar,  function(error, result){
            if(error){
                throw error;
            }else{
                  
            }
        });
        }catch(error){
          let a =  {"alerta": false , "mensaje": mensaje};
          console.log(a);
          res.send(a);
        }
      } catch (error) {
        mensaje = "No se encontro el nombre del jugador. ";
        let a =  {"alerta": false , "mensaje": mensaje};
        console.log(a);
        res.send(a);
        
      }

    
      cognito.signUp(usuario, pass+"D**", attributelist, null, async (err, data) => {
          if (err) {
              console.log(err);
    
              res.json({alerta: "No se puedo registrar el usuario: " + err.message || err});
              return;
          }
          console.log(data);
          res.json({alerta: "Usuario registrado correctamente, verificar su correo electronico."});
      });
    });
}

function InformacionUsuario(){
app.get('/obtenerUsuario/:user/', (req, res) => {
  try {
    //var datos = req.body;
    var usuario = req.params.user;
    var pass = req.params.password
    
    console.log("USUARIO recibido:" + usuario);
    console.log("Password :" + pass);

    //Obtener el pass de la base de datos
    try {
      consultar = "SELECT * FROM Usuario WHERE usuario=\""+usuario+"\";";
      console.log(consultar);
      try{
        var query = con.query(consultar,  function(error, result){
          if(error){
              throw error;
          }else{
              try{
                  console.log(result);
                  pass = result[0].password;
                  console.log("Password :" + pass);
                  var points = result[0].puntos;
                  console.log("Puntos :" + points);

                  //Continuacion con cognito
                  var authenticationData = {
                    Username: usuario,
                    Password: pass + "D**"
                };
                var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
                    authenticationData
                );
                var userData = {
                    Username: usuario,
                    Pool: cognito,
                };
                var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
                cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
              
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result) {
                        // User authentication was successful
                         //
                         var matriz = new Array(6);
                        cognitoUser.getUserAttributes(function(err, result) {
                          if (err) {
                            res.json(err.message );
                            return;
                          }
                          for (i = 0; i < result.length; i++) {
                            matriz[i] = result[i].getValue();
                            console.log(
                              'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
                            );
                          }
                          res.json({foto: matriz[0] , user: usuario, name: matriz[3], email: matriz[4], puntos: points});
                        });
                        
                      },
                    onFailure: function (err) {
                        // User authentication was not successful
                        res.json(err.message );
                        
                      },
                    mfaRequired: function (codeDeliveryDetails) {
                        // MFA is required to complete user authentication.
                        // Get the code from user and call
                        cognitoUser.sendMFACode(verificationCode, this);
                    },
                });






              }catch(err){
                  mensaje = "No se pudo encontrar la informacion del usuario.";
                  let a =  {"alerta": false , "mensaje": mensaje};
                  console.log(a);
                  res.send(a);
                  return
              }
              
          }
      });
      }catch(error){
        mensaje = "No se pudo encontrar la informacion del usuario.";
        let a =  {"alerta": false , "mensaje": mensaje};
        console.log(a);
        res.send(a);
        return
      }
    } catch (error) {
      mensaje = "No se pudo encontrar la informacion del usuario.";
      let a =  {"alerta": false , "mensaje": mensaje};
      console.log(a);
      res.send(a);
      return
    }

    

    

    

   
  } catch (error) {
    let a = { alerta: false , mensaje: "Verificar los parametros enviados..." };
    console.log(a);
    res.send(a);
  }

});




}

function ActualizarInformacion(){
    app.put('/actualizar', (req, res) => {
      try {
        //var datos = req.body;
        var datos = req.body;
        var usuario = datos.user;
        var nombre = datos.name;
        var email = datos.email;
        var pass = datos.password;
        var passNew = datos.passwordNew;
        var foto = datos.foto;
        
        console.log("USUARIO recibido:" + usuario);
        console.log("Password :" + pass);

        pass = md5(pass)

        var authenticationData = {
            Username: usuario,
            Password: pass + "D**"
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationData
        );
        var userData = {
            Username: usuario,
            Pool: cognito,
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
      
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                // User authentication was successful
                var attributeList = [];
                var atributosModificados = "Se modificaron los atributos: "

                
                if(nombre != ""){
                  //Cambio base de datos
                  try {
                    consultar = "UPDATE Usuario SET nombre=\""+nombre+"\" WHERE Usuario=\""+usuario+"\" AND PASSWORD=\""+pass+"\";"
                    console.log(consultar);
                    try{
                      var query = con.query(consultar,  function(error, result){
                        if(error){
                            throw error;
                        }else{
                            

                        }
                    });
                    }catch(error){
                      mensaje = "No se pudo agregar el usuario, no es la contraseña correcta o el usuario.";
                      let a =  {"alerta": false , "mensaje": mensaje};
                      console.log(a);
                      res.send(a);
                    }
                  }catch (error) {
                    mensaje = "No se pudo agregar el usuario, no es la contraseña correcta o el usuario.";
                    let a =  {"alerta": false , "mensaje": mensaje};
                    console.log(a);
                    res.send(a);
                  }


                  //Cambiar usuario
                  atributosModificados += "nombre ,"
                  var attribute = {
                    Name: 'name',
                    Value: nombre
                  };
                  var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
                  attributeList.push(attribute);

                  cognitoUser.updateAttributes(attributeList, function(err, result) {
                    if (err) {
                      alert(err.message || JSON.stringify(err));
                      return;
                    }
                    console.log('call result: ' + result);
                  });
                }
                if(email != ""){
                  //Cambiar usuario
                  atributosModificados += "email,"
                  var attribute = {
                    Name: 'email',
                    Value: email
                  };
                  var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
                  attributeList.push(attribute);

                  cognitoUser.updateAttributes(attributeList, function(err, result) {
                    if (err) {
                      alert(err.message || JSON.stringify(err));
                      return;
                    }
                    console.log('call result: ' + result);
                  });
                }
                if(passNew != ""){
                  //Cambio de password
                  //Cambio base de datos
                  try {
                    consultar = "UPDATE Usuario SET password=\""+passwordNew+"\" WHERE Usuario=\""+usuario+"\" AND PASSWORD=\""+pass+"\";"
                    console.log(consultar);
                    try{
                      var query = con.query(consultar,  function(error, result){
                        if(error){
                            throw error;
                        }else{
                          
                        }
                    });
                    }catch(error){
                      mensaje = "No se pudo agregar el usuario, no es la contraseña correcta o el usuario.";
                      let a =  {"alerta": false , "mensaje": mensaje};
                      console.log(a);
                      res.send(a);
                    }
                  }catch (error) {
                    mensaje = "No se pudo agregar el usuario, no es la contraseña correcta o el usuario.";
                    let a =  {"alerta": false , "mensaje": mensaje};
                    console.log(a);
                    res.send(a);
                  }

                  //Cambiar usuario
                  atributosModificados += "contraseña,"
                  passNew = md5(passNew) + "D**";
                  cognitoUser.changePassword(pass+ "D**", passNew, function(err, result) {
                    if (err) {
                      alert(err.message || JSON.stringify(err));
                      return;
                    }
                     
                  });

                }
                if(foto != ""){
                  var contador = 0
                  //Generamos un codigo hash unico por usuario. como no pueden haber 2 usuarios llamados igual aplica correctamente.
                  var string = usuario
                  for (i = 0 ;i<string.length ; i++)
                  {
                      ch = string.charCodeAt(i);
                      contador = ((contador << 5) - contador) + ch;
                      contador = contador & contador;
                  }
                  //Contruimos para agregar la foto;
                  var id = "foto" + contador + "_" + usuario;
                  //Primero hay que guardar la foto del perfil.
                  var nombrei = "Fotos_Perfil/" + id + ".jpg"; // fotos -> se llama la carpeta
                  var nombreCompleto = "http://practica1-g9-imagenes.s3.amazonaws.com/"+nombrei;

                  //Actualizamos la foto
                  try {
                    consultar = "UPDATE Usuario SET foto=\""+nombreCompleto+"\" WHERE Usuario=\""+usuario+"\" AND PASSWORD=\""+pass+"\";"
                    console.log(consultar);
                    try{
                      var query = con.query(consultar,  function(error, result){
                        if(error){
                            throw error;
                        }else{
                          
                        }
                    });
                    }catch(error){
                      mensaje = "No se pudo agregar el usuario, no es la contraseña correcta o el usuario.";
                      let a =  {"alerta": false , "mensaje": mensaje};
                      console.log(a);
                      res.send(a);
                    }
                  }catch (error) {
                    mensaje = "No se pudo agregar el usuario, no es la contraseña correcta o el usuario.";
                    let a =  {"alerta": false , "mensaje": mensaje};
                    console.log(a);
                    res.send(a);
                  }

                  console.log(nombrei);
                  //se convierte la base64 a bytes          
                  let buff = new Buffer.from(foto, 'base64');
                  AWS.config.update({
                    region: 'us-east-1', // se coloca la region del bucket 
                    accessKeyId: 'AKIA5DGZNJHPSPFRHSGF',
                    secretAccessKey: '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'
                  });
                  var s3 = new AWS.S3(); // se crea una variable que pueda tener acceso a las caracteristicas de S3
                  // metodo 1
                  const params = {
                    Bucket: "practica1-g9-imagenes",
                    Key: nombrei,
                    Body: buff,
                    ContentType: "image"
                  };
                  s3.putObject(params).promise();

                  //Cambiar usuario
                  atributosModificados += "foto,"
                  var attribute = {
                    Name: 'custom:foto',
                    Value: nombreCompleto
                  };
                  var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
                  attributeList.push(attribute);

                  cognitoUser.updateAttributes(attributeList, function(err, result) {
                    if (err) {
                      alert(err.message || JSON.stringify(err));
                      return;
                    }
                    console.log('call result: ' + result);
                  });
                }
                res.json({alerta: atributosModificados});
            },
            onFailure: function (err) {
                // User authentication was not successful
                res.json(err.message );
                
              },
            mfaRequired: function (codeDeliveryDetails) {
                // MFA is required to complete user authentication.
                // Get the code from user and call
                cognitoUser.sendMFACode(verificationCode, this);
            },
        });

        

      
      } catch (error) {
        let a = { alerta: false , mensaje: "Verificar los parametros enviados..." };
        console.log(a);
        res.send(a);
      }

    });



}

function TraducirDescripcion(){
  try {
    app.post('/traducirDescripcion', (req, res) => {
      //Primero necesitamos extraer el texto de la imagen
      console.log("Traduciendo.");
      AWS.config.update({
        region: 'us-east-1', // se coloca la region del bucket 
        accessKeyId: 'AKIARBGTLGJNMUVUHD4J',
        secretAccessKey: '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'
      });
      var datos = req.body;
      var name = datos.nombre;
      var idiomaObjetivo = datos.idioma;
      //var descripcionImagen = "";
      try {
          consultar = "SELECT * FROM Jugador WHERE nombre=\""+name+"\";";
          console.log(consultar);
          try{
            var query = con.query(consultar,  function(error, result){
              if(error){
                  throw error;
              }else{
                try {
                  var text = "Nombre: " + result[0].Nombre + ", ";
                  text +=     "Posicion: " + result[0].Posicion + ", ";
                  text +=     "Edad: " + result[0].Edad + ", ";
                  text +=     "Equipo actual: " + result[0].Equipo_Actual + ", ";
                  text +=     "Alias: " + result[0].Alias + ", ";
                  
                } catch (error) {
                  res.send({ alerta: false, mensaje:"No se puede traducir la descripcion , traslate no encontro al jugador con ese nombre."})
                  return;
                }
                var params = {
                  SourceLanguageCode: 'auto',
                  TargetLanguageCode: idiomaObjetivo,
                  Text: text 
                };
                var translate = new AWS.Translate();
                translate.translateText(params, function (err, data) {
                  if (err) {
                    res.send({ error: err })
                  } else {
                    console.log(data);
                    res.send({ alerta: true, original: text, mensaje: data.TranslatedText })
                  }
                });
              }
          });
          }catch(error){
            let a =  {"error": "No existe el jugador"};
            console.log(a);
            res.send(a);
          }
      } catch (error) {
        mensaje = "No se encontro el nombre del jugador. ";
        let a =  {"alerta": mensaje, "valor": false};
        console.log(a);
        res.send(a);
        
      }


          
               
               
                
            
    
  });
  } catch (error) {
    let a = [ {"alerta": "Verificar los parametros enviados..." , "valor": false}];
    console.log(a);
    res.send(a);
  }




}

function ObtenerEstadios(){
    app.get('/obtenerEstadios', (req, res) => {
      try{
        //Obtener el pass de la base de datos
        try {
          consultar = "SELECT * FROM Estadio ;";
          console.log(consultar);
          try{
            var query = con.query(consultar,  function(error, result){
              if(error){
                  throw error;
              }else{
                  try{
                      res.send({estado: true, result:result});
                  }catch(err){
                      mensaje = "No se pudo encontrar la informacion de los estadios, avisar al encargado :V.";
                      let a =  {"alerta": false , "mensaje": mensaje};
                      console.log(a);
                      res.send(a);
                      return
                  }
                  
              }
          });
          }catch(error){
            mensaje = "No se pudo encontrar la informacion del usuario.";
            let a =  {"alerta": false , "mensaje": mensaje};
            console.log(a);
            res.send(a);
            return
          }
        } catch (error) {
          mensaje = "No se pudo encontrar la informacion del usuario.";
          let a =  {"alerta": false , "mensaje": mensaje};
          console.log(a);
          res.send(a);
          return
        }
      }catch (error) {
        let a = { alerta: false , mensaje: "Verificar los parametros enviados..." };
        console.log(a);
        res.send(a);
      }
    }); 
}
  
function ObtenerConfederacion(){
    app.get('/obtenerConfederacion', (req, res) => {
      try{
        //Obtener el pass de la base de datos
        try {
          consultar = "SELECT * FROM Confederacion ;";
          console.log(consultar);
          try{
            var query = con.query(consultar,  function(error, result){
              if(error){
                  throw error;
              }else{
                  try{
                    res.send({estado: true, result:result});
                  }catch(err){
                      mensaje = "No se pudo encontrar la informacion de los estadios, avisar al encargado :V.";
                      let a =  {"alerta": false , "mensaje": mensaje};
                      console.log(a);
                      res.send(a);
                      return
                  }
                  
              }
          });
          }catch(error){
            mensaje = "No se pudo encontrar la informacion del usuario.";
            let a =  {"alerta": false , "mensaje": mensaje};
            console.log(a);
            res.send(a);
            return
          }
        } catch (error) {
          mensaje = "No se pudo encontrar la informacion del usuario.";
          let a =  {"alerta": false , "mensaje": mensaje};
          console.log(a);
          res.send(a);
          return
        }
      }catch (error) {
        let a = { alerta: false , mensaje: "Verificar los parametros enviados..." };
        console.log(a);
        res.send(a);
      }
    });   
}
  
function ObtenerTop(){
    app.get('/obtenerTop', (req, res) => {
      try{
        //Obtener el pass de la base de datos
        try {
          consultar = "SELECT Pais,Mundiales_Ganados FROM Seleccion WHERE Mundiales_Ganados > 0 ORDER BY Mundiales_Ganados DESC;";
          console.log(consultar);
          try{
            var query = con.query(consultar,  function(error, result){
              if(error){
                  throw error;
              }else{
                  try{
                    res.send({estado: true, result:result});
                  }catch(err){
                      mensaje = "No se pudo encontrar la informacion de los estadios, avisar al encargado :V.";
                      let a =  {"alerta": false , "mensaje": mensaje};
                      console.log(a);
                      res.send(a);
                      return
                  }
                  
              }
          });
          }catch(error){
            mensaje = "No se pudo encontrar la informacion del usuario.";
            let a =  {"alerta": false , "mensaje": mensaje};
            console.log(a);
            res.send(a);
            return
          }
        } catch (error) {
          mensaje = "No se pudo encontrar la informacion del usuario.";
          let a =  {"alerta": false , "mensaje": mensaje};
          console.log(a);
          res.send(a);
          return
        }
      }catch (error) {
        let a = { alerta: false , mensaje: "Verificar los parametros enviados..." };
        console.log(a);
        res.send(a);
      }
    });  
}

function SuscribirEmail(){
  AWS.config.update({
    region: 'us-east-1', // se coloca la region del bucket 
    accessKeyId: 'AKIARBGTLGJNPKBVC5KQ',
    secretAccessKey: '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'
  });
  const sns = new AWS.SNS();  
  app.post('/suscribirEmail', (req, res) => {
    //Primero necesitamos extraer el texto de la imagen
    console.log("Traduciendo.");
    
    var datos = req.body;
    var email = datos.email;
    console.log("Email: " + email);
    //var idiomaObjetivo = datos.idioma;
    //var descripcionImagen = "";
    try {
         // Set the parameters
          let params = {
            Protocol: 'EMAIL', 
            TopicArn: 'arn:aws:sns:us-east-1:071310193242:Futbol',
            Endpoint: email
          };
  
          sns.subscribe(params, (err, data) => {
              if (err) {
                  console.log(err);
              } else {
                  console.log(data);
                  res.send(data);
              }
          });

    } catch (error) {
      mensaje = "No se encontro el nombre del jugador. ";
      let a =  {"alerta": mensaje, "valor": false};
      console.log(a);
      res.send(a);
      
    }


        
             
             
              
          
  
});



}

const optionsRekognition = {
  region: 'us-east-2',
  accessKeyId: 'AKIAW2CKO7KN3MUSJ4U2',
  secretAccessKey: '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'
}

async function ejecutarConsulta(consulta) {
  return new Promise((resolve, reject) => {
    con.query(consulta, function(error, response) {
      if (error) {
        console.log(error);
        return reject(new Error("Error al procesar la petición"));
      } else return resolve(response);      
    });
  });
}

function obtenerInfoJugadorRekognition() {
  app.post('/api/jugadores/buscar', async (req, res) => {
    // Validar que exista la propiedad base64 en la petición    
    if (!req.body.base64) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Error al procesar la petición: verifique el contenido de la petición."
      });      
    }
    // Obtener el nombre del jugador
    try {
      // Obtener el nombre del jugador usando Rekognition
      let result = await detectarJugador(req.body.base64);
      // Si se produjo algún error o el resultado es indenfinido
      if (!result) {
        return res.status(500).json({
          estado: 'ERROR',
          mensaje: 'Se produjo un error al procesar la petición'
        });        
      }      
      // Si se obtuvo algún resultado de Rekognition
      if (result.CelebrityFaces.length > 0) {
        // Obtener el nombre del jugador
        const nombre = result.CelebrityFaces[0].Name;
        // Consulta para obtener la información del usuario
        const consulta = `SELECT * FROM Jugador WHERE Nombre = '${nombre}'`;
        // Ejecutar la consulta
        try {
          // Obtener la información de la base de datos
          let info = await ejecutarConsulta(consulta); 
          // Si la consulta no devolvió ningún resultado
          if (info.length === 0) {
            return res.status(404).json({
              estado: "ERROR",
              mensaje: "No se encontró ninguna coincidencia"
            });
          }
          // Devolver la información del jugador
          return res.status(200).json({
            estado: "OK",
            result: info
          });
        } catch (error) {          
          return res.status(500).json({
            estado: 'ERROR',
            mensaje: "Se produjo un error al procesar la petición"
          });
        }        
      }
    } catch (error) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición"
      });      
    }    
  });
}

async function detectarJugador(imgBase64) {
  // Obtener el buffer de la imagen en base64
  const bufferImage = Buffer.from(imgBase64, 'base64');
  // Crear objeto de parámetros
  const params = {
    Image: {
      Bytes: bufferImage
    }
  }
  // Crear objeto de Rekognition
  const rekognition = new AWS.Rekognition(optionsRekognition);
  // Tratar de detectar al jugador    
  try {
    const result = await rekognition.recognizeCelebrities(params).promise();
    console.log(result);
    return result;  // Retornar el resultado
  } catch (err) {
    console.log('Error: ', err) // Retornar undefined
  }
}

const optionsPolly = {
  region: 'us-east-2',
  accessKeyId: 'AKIAW2CKO7KNVVKCOT5A',
  secretAccessKey: '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'    
}

async function obtenerAudio(text, id) {
  // Crear objeto de Polly
  const polly = new AWS.Polly(optionsPolly);
  // Crear objeto de parámetros
  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Penelope'
  }      

  return polly.synthesizeSpeech(params).promise()
  .then(data => {    
    return data;
  }).catch(error => {
    return error;
  })  
}

function obtenerAudioPreguntaPolly() {   
  app.get('/api/trivia/pregunta/:id', async (req, res) => {
    // Consulta para obtener la pregunta de la base de datos
    const consulta = `SELECT * FROM Trivia WHERE idTrivia = ${req.params.id}`;
    // Obtener la pregunta desde la base de datos
    try {
      // Tratar de obtener la pregunta
      let result =  await ejecutarConsulta(consulta);      
      // Obtener el contenido de la pregunta
      const pregunta = result[0].Pregunta;
      // Crear el audio
      const audio = await obtenerAudio(pregunta, req.params.id);
      // Nombre para guardar el archivo
      const nombre = `pregunta_${req.params.id}.mp3`;
      // Ruta para guardar el archivo
      const ruta = `./public/trivia/${nombre}`;
      
      if (audio.AudioStream instanceof Buffer) {                
        fs.writeFile(ruta, audio.AudioStream, error => {          
          if (error) {            
            return res.status(500).json({
              estado: "ERROR",
              mensaje: "Se produjo un error al procesar la petición"
            })
          } else {            
            return res.sendFile(`./public/trivia/${nombre}`, {root: __dirname}, err => {
              if (err) {                
                console.log("Error: ", err);
              }
            });            
          }
        });                   
      }     
    } catch (error) {      
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Error al procesar la petición: verifique el contenido de la petición.",
        log: error
      }); 
    }    
  });
}

function validarRespuesta() {
  app.post('/api/trivia/respuesta', async function(req, res) {    
    // Verificar que venga el nombre del usuario
    if (!req.body.idUsuario || !req.body.idTrivia || !req.body.respuesta) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición [1]"
      });
    }    
    // Consulta para obtener la respuesta a la pregunta
    const consulta = `SELECT Respuesta FROM Trivia WHERE idTrivia = ${req.body.idTrivia}`;
    // Obtener la respuesta
    try {
      // Consultar en la base de datos
      let result = await ejecutarConsulta(consulta);
      // Verificar que venga la respuesta
      if (!result) {
        return res.status(500).json({
          estado: "ERROR",
          mensaje: "Se produjo un error al procesar la petición"
        });        
      }
      // Comparar la respuesta correcta con la respuesta del usuario
      let ok = result[0].Respuesta.toLowerCase().localeCompare(req.body.respuesta.toLowerCase());
      // Si la respuesta es correcta
      if (ok !== 0) {        
        // Devolver el resultado
        return res.status(200).json({
          resultado: "Incorrecto",
          respuesta: result[0].Respuesta
        });
      }
      // Consulta para obtener la puntuación del usuario
      let query = `SELECT puntos FROM Usuario WHERE idUsuario = ${req.body.idUsuario}`;
      // Obtener la puntuación del usuario
      let data = await ejecutarConsulta(query);
      // Sumar 1 punto al total
      let nuevaPuntuacion = data[0].puntos + 1;
      // Consulta para actualizar la puntuación en la base de datos
      query = `UPDATE Usuario SET puntos = ${nuevaPuntuacion} WHERE idUsuario = ${req.body.idUsuario}`;
      // Actulizar la puntuación
      let response = await ejecutarConsulta(query);
      // Si todo salió bien
      return res.status(200).json({
        resultado: "Correcto"          
      });      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición [0]"
      })      
    }    
  });
}

function obtenerAudioRespuestaPolly() {   
  app.get('/api/trivia/respuesta/:id', async (req, res) => {
    // Consulta para obtener la pregunta de la base de datos
    const consulta = `SELECT * FROM Trivia WHERE idTrivia = ${req.params.id}`;
    // Obtener la pregunta desde la base de datos
    try {
      // Tratar de obtener la pregunta
      let result =  await ejecutarConsulta(consulta);      
      // Obtener el contenido de la pregunta
      const respuesta = result[0].Respuesta;
      // Crear el audio
      const audio = await obtenerAudio(respuesta, req.params.id);
      // Nombre para guardar el archivo
      const nombre = `respuesta_${req.params.id}.mp3`;
      // Ruta para guardar el archivo
      const ruta = `./public/trivia/${nombre}`;
      
      if (audio.AudioStream instanceof Buffer) {                
        fs.writeFile(ruta, audio.AudioStream, error => {          
          if (error) {            
            return res.status(500).json({
              estado: "ERROR",
              mensaje: "Se produjo un error al procesar la petición"
            })
          } else {            
            return res.sendFile(`./public/trivia/${nombre}`, {root: __dirname}, err => {
              if (err) {                
                console.log("Error: ", err);
              }
            });            
          }
        });                   
      }     
    } catch (error) {      
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Error al procesar la petición: verifique el contenido de la petición.",
        log: error
      }); 
    }    
  });
}

function obtenerSelecciones() {
  app.get('/api/selecciones', async function(req, res) {
    // Consulta para obtener la informació sobre las selecciones
    const consulta = `SELECT * FROM Seleccion `;    
    try {
      // Consultar en la base de datos
      let result = await ejecutarConsulta(consulta);
      // Devolver el resultado
      return res.status(200).json({
        estado: "OK",
        result: result
      });
    } catch (error) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición"
      })      
    }
    
  });
}

function obtenerSeleccionesConfederacion() {
  app.get('/api/selecciones/confederacion/:id', async function(req, res) {
    // Consulta para obtener la informació sobre las selecciones
    const consulta = `SELECT * FROM Seleccion WHERE idConfederacion = ${req.params.id} `;    
    try {
      // Consultar en la base de datos
      let result = await ejecutarConsulta(consulta);
      // Devolver el resultado
      return res.status(200).json({
        estado: "OK",
        result: result
      });
    } catch (error) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición"
      })      
    }    
  });
}

function obtenerJugadores() {
  app.get('/api/jugadores', async function(req, res) {
    // Consulta para obtener la informació sobre los jugadores selecciones
    const consulta = `SELECT * FROM Jugador `;    
    try {
      // Consultar en la base de datos
      let result = await ejecutarConsulta(consulta);
      // Devolver el resultado
      return res.status(200).json({
        estado: "OK",
        result: result
      });
    } catch (error) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición"
      })      
    }    
  });
}

function obtenerJugadoresSeleccion() {
  app.get('/api/jugadores/seleccion/:id', async function(req, res) {
    // Consulta para obtener la informació sobre los jugadores
    const consulta = `SELECT * FROM Jugador WHERE idSeleccion = ${req.params.id}`;    
    try {
      // Consultar en la base de datos
      let result = await ejecutarConsulta(consulta);
      // Devolver el resultado
      return res.status(200).json({
        estado: "OK",
        result: result
      });
    } catch (error) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición"
      })      
    }
    
  });
}

function obtenerPartidosEstadio() {
  app.get('/api/partidos/estadio/:id', async function(req, res) {
    // Consulta para obtener la informació sobre los partidos
    const consulta = `SELECT Hora, Fecha, S1.Pais AS Pais1 ,S1.Bandera AS Bandera1, S2.Pais AS Pais2 , S2.Bandera AS Bandera2 FROM Partido 
    INNER JOIN Seleccion AS S1 ON Partido.idEquipo1 = S1.idSeleccion
    INNER JOIN Seleccion AS S2 ON Partido.idEquipo2 = S2.idSeleccion
    WHERE idEstadio = ${req.params.id}`;    
    try {
      // Consultar en la base de datos
      let result = await ejecutarConsulta(consulta);
      // Devolver el resultado
      return res.status(200).json({
        estado: "OK",
        result: result
      });
    } catch (error) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición"
      })      
    }    
  });
}

function obtenerPartidosFecha() {
  app.get('/api/partidos/fecha/', async function(req, res) {
    // Consulta para obtener la información sobre las partidos
    const consulta = `SELECT Hora, Fecha, S1.Pais AS Pais1 ,S1.Bandera AS Bandera1, S2.Pais AS Pais2 , S2.Bandera AS Bandera2 FROM Partido 
    INNER JOIN Seleccion AS S1 ON Partido.idEquipo1 = S1.idSeleccion
    INNER JOIN Seleccion AS S2 ON Partido.idEquipo2 = S2.idSeleccion
    WHERE Fecha = '${req.body.fecha}'`;    
    try {
      // Consultar en la base de datos
      let result = await ejecutarConsulta(consulta);
      // Devolver el resultado
      return res.status(200).json({
        estado: "OK",
        result: result
      });
    } catch (error) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición"
      })      
    }    
  });
}

function obtenerPartidosEquipo() {
  app.get('/api/partidos/equipo/:id', async function(req, res) {
    // Consulta para obtener la información sobre las partidos
    const consulta = `SELECT Hora, Fecha, S1.Pais AS Pais1, S1.Bandera AS Bandera1, S2.Pais AS Pais2, S2.Bandera AS Bandera2 FROM Partido 
    INNER JOIN Seleccion AS S1 ON Partido.idEquipo1 = S1.idSeleccion
    INNER JOIN Seleccion AS S2 ON Partido.idEquipo2 = S2.idSeleccion
    WHERE S1.idSeleccion = ${req.params.id} OR S2.idSeleccion = ${req.params.id};
    `;    
    try {
      // Consultar en la base de datos
      let result = await ejecutarConsulta(consulta);
      // Devolver el resultado
      return res.status(200).json({
        estado: "OK",
        result: result
      });
    } catch (error) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición"
      })      
    }    
  });
}

function obtenerTopUsuarios() {
  app.get('/api/trivia/top', async function(req, res) {
    // Consulta para obtener la información sobre las partidos
    const consulta = `SELECT usuario,puntos FROM Usuario
    ORDER BY puntos DESC
    LIMIT 10;`;    
    try {
      // Consultar en la base de datos
      let result = await ejecutarConsulta(consulta);
      // Devolver el resultado
      return res.status(200).json({
        estado: "OK",
        result: result
      });
    } catch (error) {
      return res.status(500).json({
        estado: "ERROR",
        mensaje: "Se produjo un error al procesar la petición"
      })      
    }    
  });
}

function obtenerPartidos(){
  app.get('/obtenerPartidos', (req, res) => {
    try{
      //Obtener el pass de la base de datos
      try {
        consultar = `SELECT Hora, Fecha, S1.Pais AS Pais1 ,S1.Bandera AS Bandera1, S2.Pais AS Pais2 , S2.Bandera AS Bandera2 FROM Partido 
        INNER JOIN Seleccion AS S1 ON Partido.idEquipo1 = S1.idSeleccion
        INNER JOIN Seleccion AS S2 ON Partido.idEquipo2 = S2.idSeleccion;`;
        console.log(consultar);
        try{
          var query = con.query(consultar,  function(error, result){
            if(error){
                throw error;
            }else{
                try{
                    res.send({estado: true, result:result});
                }catch(err){
                    mensaje = "No se pudo encontrar la informacion de los estadios, avisar al encargado :V.";
                    let a =  {"alerta": false , "mensaje": mensaje};
                    console.log(a);
                    res.send(a);
                    return
                }
                
            }
        });
        }catch(error){
          mensaje = "No se pudo encontrar la informacion de los partidos";
          let a =  {"alerta": false , "mensaje": mensaje};
          console.log(a);
          res.send(a);
          return
        }
      } catch (error) {
        mensaje = "No se pudo encontrar la informacion de los partidos.";
        let a =  {"alerta": false , "mensaje": mensaje};
        console.log(a);
        res.send(a);
        return
      }
    }catch (error) {
      let a = { alerta: false , mensaje: "No se pudo encontrar la informacion de los partidos." };
      console.log(a);
      res.send(a);
    }
  });  
}

//-----Funciones varias que se utilizan para distintas aplicaciones.----

//Inicializa la API en el puerto especifico.
function iniciarAPI() {
    app.set('port', puerto);
    //middlewares
    app.use(cors());
    app.use(express.json({ limit: '500mb' }));
    app.use(express.urlencoded({ limit: '500mb' ,extended: false}));
  
  
    exports.default = app;
    app.listen(puerto);
    console.log("Servidor corriendo en el puerto: " + puerto);
  
}
 

//-----------------------------------FUNCIONES------------------------------
  function antiError(){
      try {
        iniciarAPI();
        Login();
        Registrar();
        InformacionUsuario();
        ActualizarInformacion();
        TraducirDescripcion();
        obtenerInfoJugadorRekognition();
        obtenerAudioPreguntaPolly();
        obtenerSelecciones();
        obtenerSeleccionesConfederacion();
        obtenerJugadores();
        obtenerJugadoresSeleccion();
        obtenerPartidosEstadio();
        obtenerPartidosFecha();
        obtenerPartidosEquipo();
        ObtenerEstadios();
        ObtenerConfederacion();
        ObtenerTop();
        SuscribirEmail();
        obtenerTopUsuarios();
        validarRespuesta();
        obtenerAudioRespuestaPolly();
        obtenerPartidos();
      } catch (error) {
        //antiError();
        console.log("Fatality. Finish him :v");
      }
  }
  
//-----------------------------------FIN FUNCIONES------------------------------
  

  try {
    antiError();
  } catch (error) {
    console.log("Fatality. Finish him :v");
  }