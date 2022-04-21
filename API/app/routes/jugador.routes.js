module.exports = app => {
    
    const jugadores = require('../controllers/jugadores');

    var router = require('express').Router();

    // Obtener el nombre del jugador a través de Rekognition
    router.get('/buscar', jugadores.encontrar);

    app.use('/api/jugadores', router);
}