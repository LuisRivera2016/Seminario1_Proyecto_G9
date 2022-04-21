const AWS = require('aws-sdk');
const config = require('./config/config-rekognition');

// Opciones de configuración para Rekognition
const options = {
    region: config.REK_REGION,
    accessKeyId: config.REK_ACCESS_KEY,
    secretAccessKey: config.REK_SECRET_ACCESS_KEY
}

// Crear instancia de Rekognition
const rekognition = new AWS.Rekognition(options);

const Deteccion = {};

Deteccion.buscarPorFoto = async imgBase64 => {
    // Obtener el buffer de la imagen en base64
    const bufferImage = Buffer.from(imgBase64, 'base64');
    // Crear objeto de parámetros
    const params = {
        Image: {
            Bytes: bufferImage
        }
    }
    // Obtener el nombre de la persona, si se detecta
    try {
        const result = await rekognition.recognizeCelebrities(params).promise();
        console.log(result);
        return result;
    } catch (err) {        
        console.error(err);        
    }
};

module.exports = Deteccion;