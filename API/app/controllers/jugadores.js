const Jugador = require('../models/jugador.model.js');

exports.encontrar = async (req, res) => {
    // Validar que el cuerpo de la petición no venga vacío y que el campo base64 no sea una cadena vacía
    if(!req.body && req.body.base64 !== "") {
        res.status(400).json({
            estado: "ERROR",
            mensaje: "Error al procesar la petición: verifique el contenido de la petición"
        });
    }    
    // Obtener el nombre del jugador, si se detecta
    try {        
        // Obtener la información sobre el jugador
        let result = await Jugador.buscarPorFoto(req.body.base64);    
        // Si se produjo algún error o result es indefinido
        if(!result) {
            return res.status(500).json({
                estado: "ERROR",
                mensaje: "Se produjo un error al obtener la información",            
            });            
        }
        // Si se detectó a algún jugador
        if (result.CelebrityFaces.length > 0) {
            // Obtener el nombre del jugador
            const nombre = result.CelebrityFaces[0].Name;
            // Obtener información de la base de datos
            Jugador.obtenerInfoPorNombre(nombre, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        estado: "ERROR",
                        mensaje: "Se produjo un error al procesar la petición"
                    });
                }
                
                if (data.length === 0) {
                    return res.status(500).json({
                        estado: "ERROR",
                        mensaje: "No se encontró ninguna coincidencia"
                    });
                }

                return res.status(200).json({
                    estado: "OK",
                    result: data[0]
                });
            });            

            /*return res.status(200).json({
                estado: "OK",                
                datos: {
                    nombre: result.CelebrityFaces[0].Name
                }                                                    
            });*/
        } else {
            return res.status(404).json({
                estado: "ERROR",
                mensaje: "No se encontró ninguna coincidencia",                
            });
        }        
    } catch (err) {
        console.error(err);        
        return res.status(500).json({
            estado: "ERROR",
            mensaje: "Se produjo un error al obtener la información",            
        });
    }
};