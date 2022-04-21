const sql = require('./db');
const Deteccion = require('../utils/rekognition/deteccion');

const Jugador = function(jugador) {
        
};

Jugador.buscarPorFoto = async imgBase64 => {    
    try {
        let data = await Deteccion.buscarPorFoto(imgBase64);
        console.log(data);        
        return data;
    } catch (err) {        
        console.error(err);        
        return;
    }
};

Jugador.obtenerInfoPorNombre = (nombre, result) => {
    sql.query(`SELECT * FROM Jugador WHERE Nombre = '${nombre}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }          
        
        console.log("Información del jugador: ", res);
        result(null, res);
    });
};

module.exports = Jugador;