//Variables base de datos
var mariaDB = require('mysql');
//Lista de consultas

//Variables para cargar pagina
const http = require("http");
const host = "localhost";
const ports = 8000;
const fs = require('fs').promises;

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
  app.get('/obtenerUsuario/:user/:password', (req, res) => {
    try {
      //var datos = req.body;
      var usuario = req.params.user;
      var pass = req.params.password
      
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
                res.json({foto: matriz[0] , user: usuario, name: matriz[3], email: matriz[4]});
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
      var id = datos.id;
      var idiomaObjetivo = datos.idioma;
      var descripcionImagen = "";
      try {
          consultar = "SELECT descripcion FROM Jugador WHERE idJugador = "+id+";"
          try{
            var query = con.query(consultar,  function(error, result){
              if(error){
                  throw error;
              }else{
                try {
                  var text = result[0].descripcion;
                } catch (error) {
                  res.send({ descripcion: "No se puede traducir la descripcion , traslate no encontro texto." ,traduccion: "Null" })
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
                    res.send({ descripcion: text, traduccion: data.TranslatedText })
                  }
                });
              }
          });
          }catch(error){
            let a =  {"error": "No existe el id de esa foto."};
            console.log(a);
            res.send(a);
          }
      } catch (error) {
        mensaje = "No se encontro el id de la foto. ";
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