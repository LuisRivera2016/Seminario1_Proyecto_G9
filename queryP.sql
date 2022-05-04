USE practica1;

CREATE TABLE Prueba (
    idPrueba BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    dpi VARCHAR(20) UNIQUE,
    name VARCHAR(150),
    email VARCHAR(100)  
);

 INSERT INTO Prueba (dpi,name,email) VALUES ('3048','Luis Rivera','luis@gmail.com');
 INSERT INTO Prueba (dpi,name,email) VALUES ('5589','Brayna Perez','brayan@gmail.com');
 INSERT INTO Prueba (dpi,name,email) VALUES ('8011','Luis Enrique','enrique@gmail.com');
 INSERT INTO Prueba (dpi,name,email) VALUES ('1234','Carlos Lopes','carlos@gmail.com');
 INSERT INTO Prueba (dpi,name,email) VALUES ('5678','Sukuna Sama','sukuna@gmail.com');
 
 SELECT * FROM Prueba;

 
 CREATE TABLE Usuario (
    idUsuario BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE,
    password VARCHAR(60),
    correo VARCHAR(250),
    nombre VARCHAR(300),
    foto VARCHAR(100),
    puntos INT
);

SELECT * FROM Usuario;


CREATE TABLE Mundial(
	idMundial BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Sede VARCHAR(55),
    Nombre VARCHAR(55)
);

CREATE TABLE Trivia(
	idTrivia BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Pregunta VARCHAR(255),
    Respuesta VARCHAR(255)
);

CREATE TABLE Estadio (
    idEstadio BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(155),
    Ubicacion VARCHAR(155),
    Capacidad INT,
    Imagen VARCHAR(55),
    idMundial BIGINT UNSIGNED,
	FOREIGN KEY (idMundial) REFERENCES Mundial(idMundial) ON DELETE CASCADE
);


CREATE TABLE Partido (
    idPartido BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Hora TIME,
    Fecha DATE,
    idEquipo1 BIGINT UNSIGNED,
    idEquipo2 BIGINT UNSIGNED,
    idEstadio BIGINT UNSIGNED,
    FOREIGN KEY (idEquipo1) REFERENCES Seleccion(idSeleccion) ON DELETE CASCADE,
    FOREIGN KEY (idEquipo2) REFERENCES Seleccion(idSeleccion) ON DELETE CASCADE,
	FOREIGN KEY (idEstadio) REFERENCES Estadio(idEstadio) ON DELETE CASCADE
);

CREATE TABLE Confederacion(
	idConfederacion BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(150),
    Siglas VARCHAR(55),
    Escudo VARCHAR(100)
);


CREATE TABLE Seleccion(
	idSeleccion BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Pais VARCHAR(100),
    Escudo VARCHAR(100),
	Bandera VARCHAR(100),
    Mundiales_Ganados INT,
    idConfederacion BIGINT UNSIGNED,
    FOREIGN KEY (idConfederacion) REFERENCES Confederacion(idConfederacion) ON DELETE CASCADE
);

 CREATE TABLE Jugador (
    idJugador BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(155),
    Foto VARCHAR(100),
    Posicion VARCHAR(55),
    Edad INT,
    Equipo_Actual VARCHAR(155),
    Alias VARCHAR(100),
    idSeleccion BIGINT UNSIGNED,
    FOREIGN KEY (idSeleccion) REFERENCES Seleccion(idSeleccion) ON DELETE CASCADE
);



-- ///////////////////////////////////////////////////// INSERTS 
INSERT INTO Mundial(Sede,Nombre) VALUES('Catar','Catar 2022');
SELECT *FROM Mundial;

-- ////////////////////////////////////////ESTADIOS

INSERT INTO Estadio(Nombre,Ubicacion,Capacidad,Imagen,idMundial) 
VALUES("Estadio Iconico de Lusail","Lusail, Municipio de Al Daayen",94500,"Fotos_Estadio/LusailEstadio.jpg",1);

INSERT INTO Estadio(Nombre,Ubicacion,Capacidad,Imagen,idMundial) 
VALUES("Estadio Al Janoub","Al Wakrah, Municipio de Al Wakrah",40000,"Fotos_Estadio/AlJanoubEstadio.jpg",1);

INSERT INTO Estadio(Nombre,Ubicacion,Capacidad,Imagen,idMundial) 
VALUES("Estadio 974","Doha, Municipio de Ad Dawhah",40000,"Fotos_Estadio/974Estadio.jpg",1);

INSERT INTO Estadio(Nombre,Ubicacion,Capacidad,Imagen,idMundial) 
VALUES("Estadio Al Thumama","Doha, Municipio de Ad Dawhah",69000,"Fotos_Estadio/AlThumamaEstadio.jpg",1);

INSERT INTO Estadio(Nombre,Ubicacion,Capacidad,Imagen,idMundial) 
VALUES("Estadio Internacional Khalifa","Rayan, Municipio de Rayan",50000,"Fotos_Estadio/InternacionalKhalifaEstadio.jpg",1);

INSERT INTO Estadio(Nombre,Ubicacion,Capacidad,Imagen,idMundial) 
VALUES("Estadio Ciudad de la Educacion","Rayan, Municipio de Rayan",45350,"Fotos_Estadio/CiudadEducacionEstadio.jpg",1);

INSERT INTO Estadio(Nombre,Ubicacion,Capacidad,Imagen,idMundial) 
VALUES("Estadio Ahmed bin Ali","Rayan, Municipio de Rayan",44740,"Fotos_Estadio/AhmedBinAliEstadio.jpg",1);

INSERT INTO Estadio(Nombre,Ubicacion,Capacidad,Imagen,idMundial) 
VALUES("Estadio Al Bayt","Jor, Municipio de Jor",60000,"Fotos_Estadio/AlBaytEstadio.jpg",1);

SELECT *FROM Estadio;

-- ////////////////////////////////////////CONFEDERACIONES

INSERT INTO Confederacion(Nombre,Siglas,Escudo) 
VALUES("Confederacion Asiatica de Futbol","AFC","Fotos_Confederacion/AFC.png");

INSERT INTO Confederacion(Nombre,Siglas,Escudo) 
VALUES("Confederacion Africana de Futbol","CAF","Fotos_Confederacion/CAF.png");

INSERT INTO Confederacion(Nombre,Siglas,Escudo) 
VALUES("Confederacion de Norteamerica, Centroamerica y el Caribe de Futbol","Concacaf","Fotos_Confederacion/Concacaf.png");

INSERT INTO Confederacion(Nombre,Siglas,Escudo) 
VALUES("Confederacion Sudamericana de Futbol","Conmebol","Fotos_Confederacion/Conmebol.jpg");

INSERT INTO Confederacion(Nombre,Siglas,Escudo) 
VALUES("Confederacion de Futbol de Oceania","OFC","Fotos_Confederacion/OFC.png");

INSERT INTO Confederacion(Nombre,Siglas,Escudo) 
VALUES("Union de Federaciones Europeas de Futbol","UEFA","Fotos_Confederacion/UEFA.jpg");

SELECT * FROM Confederacion;

-- ////////////////////////////////////////SELECCIONES

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Portugal","Fotos_Escudo/PortugalE.png","Fotos_Bandera/PortugalB.png",0,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Alemania","Fotos_Escudo/AlemaniaE.png","Fotos_Bandera/AlemaniaB.jpg",4,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Arabia Saudita","Fotos_Escudo/ArabiaE.png","Fotos_Bandera/ArabiaB.png",0,1);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Argentina","Fotos_Escudo/ArgentinaE.png","Fotos_Bandera/ArgentinaB.png",2,4);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Belgica","Fotos_Escudo/BelgicaE.png","Fotos_Bandera/BelgicaB.png",0,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Brasil","Fotos_Escudo/BrasilE.png","Fotos_Bandera/BrasilB.jpg",5,4);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Camerun","Fotos_Escudo/CamerunE.png","Fotos_Bandera/CamerunB.png",0,2);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Canada","Fotos_Escudo/CanadaE.png","Fotos_Bandera/CanadaB.png",0,3);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Catar","Fotos_Escudo/CatarE.jpg","Fotos_Bandera/CatarB.png",0,1);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Corea del Sur","Fotos_Escudo/CoreaSE.png","Fotos_Bandera/CoreaSB.png",0,1);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Croacia","Fotos_Escudo/CroaciaE.png","Fotos_Bandera/CroaciaB.png",0,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Dinamarca","Fotos_Escudo/DinamarcaE.png","Fotos_Bandera/DinamarcaB.png",0,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Ecuador","Fotos_Escudo/EcuadorE.png","Fotos_Bandera/EcuadorB.jpg",0,4);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("España","Fotos_Escudo/EspanaE.png","Fotos_Bandera/EspanaB.png",1,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Estados Unidos","Fotos_Escudo/EstadosUE.png","Fotos_Bandera/EstadosUB.png",0,3);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Francia","Fotos_Escudo/FranciaE.png","Fotos_Bandera/FranciaB.png",2,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Ghana","Fotos_Escudo/GhanaE.png","Fotos_Bandera/GhanaB.png",0,2);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Inglaterra","Fotos_Escudo/InglaterraE.png","Fotos_Bandera/InglaterraB.png",1,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Iran","Fotos_Escudo/IranE.png","Fotos_Bandera/IranB.png",0,1);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Japon","Fotos_Escudo/JaponE.png","Fotos_Bandera/JaponB.png",0,1);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Marruecos","Fotos_Escudo/MarruecosE.png","Fotos_Bandera/MarruecosB.png",0,2);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Mexico","Fotos_Escudo/MexicoE.jpg","Fotos_Bandera/MexicoB.png",0,3);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Paises Bajos","Fotos_Escudo/PaisesBE.png","Fotos_Bandera/PaisesBB.png",0,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Polonia","Fotos_Escudo/PoloniaE.png","Fotos_Bandera/PoloniaB.png",0,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Senegal","Fotos_Escudo/SenegalE.png","Fotos_Bandera/SenegalB.jpg",0,2);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Serbia","Fotos_Escudo/SerbiaE.png","Fotos_Bandera/SerbiaB.png",0,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Suiza","Fotos_Escudo/SuizaE.png","Fotos_Bandera/SuizaB.jpg",0,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Tunez","Fotos_Escudo/TunezE.png","Fotos_Bandera/TunezB.png",0,2);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Uruguay","Fotos_Escudo/UruguayE.png","Fotos_Bandera/UruguayB.png",2,4);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Ganador Ruta A de la UEFA","Fotos_Escudo/PaisXE.png","Fotos_Bandera/PaisXB.jpg",0,7);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Ganador AFC/Conmebol","Fotos_Escudo/PaisXE.png","Fotos_Bandera/PaisXB.jpg",0,4);

INSERT INTO Seleccion(Pais,Escudo,Bandera,Mundiales_Ganados,idConfederacion) 
VALUES("Ganador OFC/Concacaf","Fotos_Escudo/PaisXE.png","Fotos_Bandera/PaisXB.jpg",0,3);

SELECT * FROM Seleccion;

-- ////////////////////////////////////////PARTIDOS
INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('19:00:00','2022-11-21',9,13,9);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('13:00:00','2022-11-21',25,23,5);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('16:00:00','2022-11-25',9,25,5);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('19:00:00','2022-11-25',23,13,6);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('18:00:00','2022-11-29',13,25,6);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('18:00:00','2022-11-29',23,9,9);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('16:00:00','2022-11-21',18,19,6);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-21',15,30,8);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('13:00:00','2022-11-25',30,19,8);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-25',18,15,9);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-29',30,18,8);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-29',19,15,5);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('13:00:00','2022-11-22',4,3,2);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('19:00:00','2022-11-22',22,24,4);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('16:00:00','2022-11-26',24,3,7);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-26',4,22,2);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-30',24,4,4);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-30',3,22,2);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('16:00:00','2022-11-22',12,28,7);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-22',16,31,3);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('13:00:00','2022-11-26',28,31,3);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('19:00:00','2022-11-26',16,12,4);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('18:00:00','2022-11-30',31,12,3);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('18:00:00','2022-11-30',28,16,7);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('16:00:00','2022-11-23',2,20,6);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('19:00:00','2022-11-23',14,32,5);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('13:00:00','2022-11-27',20,32,8);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-27',14,2,9);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-12-01',20,14,6);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-12-01',32,2,9);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('13:00:00','2022-11-23',21,11,9);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-23',5,8,8);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('16:00:00','2022-11-27',5,21,5);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('19:00:00','2022-11-27',11,8,6);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('18:00:00','2022-12-01',11,5,8);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('18:00:00','2022-12-01',8,21,5);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('13:00:00','2022-11-24',27,7,3);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-24',6,26,2);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('13:00:00','2022-11-28',7,26,3);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('19:00:00','2022-11-28',6,27,4);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-12-02',26,27,4);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-12-02',7,6,2);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('16:00:00','2022-11-24',29,10,7);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('19:00:00','2022-11-24',1,17,4);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('16:00:00','2022-11-28',10,17,7);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('22:00:00','2022-11-28',1,29,2);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('18:00:00','2022-12-02',17,29,3);

INSERT INTO Partido(Hora,Fecha,idEquipo1,idEquipo2,idEstadio) 
VALUES('18:00:00','2022-12-02',10,1,7);

SELECT * FROM Partido;

-- ////////////////////////////////////////JUGADORES

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Cristiano Ronaldo","Fotos_Jugador/CristianoRonaldo.png","DELANTERO",37,"Manchester United","El Bicho, El Comandante, CR7, El Goat",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Rui Patricio","Fotos_Jugador/RuiPatricio.png","PORTERO",34,"A. S. Roma","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Anthony Lopes","Fotos_Jugador/AnthonyLopes.png","PORTERO",31,"Olympique de Lyon","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Diogo Costa","Fotos_Jugador/DiogoCosta.jpg","PORTERO",22,"Porto","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Diogo Dalot","Fotos_Jugador/DiogoDalot.png","DEFENSA",23,"Manchester United F.C.","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Joa Cancelo","Fotos_Jugador/JoaCancelo.png","DEFENSA",27,"Manchester City","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ruben Dias","Fotos_Jugador/RubenDias.png","DEFENSA",24,"Manchester City","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Pepe","Fotos_Jugador/Pepe.png","DEFENSA",39,"Porto","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Jose Fonte","Fotos_Jugador/JoseFonte.png","DEFENSA",38,"Lille","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Yannick Djalo","Fotos_Jugador/YannickDjalo.png","DEFENSA",22,"Lille","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Cedric Soares","Fotos_Jugador/CedricSoares.png","DEFENSA",30,"Arsenal","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Raphael Guerreiro","Fotos_Jugador/RaphaelGuerreiro.jpg","DEFENSA",28,"Borussia Dortmund","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Nuno Mendes","Fotos_Jugador/NunoMendes.png","DEFENSA",19,"Paris Saint-Germain","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Joao Moutinho","Fotos_Jugador/JoaoMoutinho.png","MEDIO",35,"Wolverhampon Wanderers","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Bernardo Silva","Fotos_Jugador/BernardoSilva.png","MEDIO",27,"Manchester City","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Bruno Fernandes","Fotos_Jugador/BrunoFernandes.png","MEDIO",27,"Manchester United","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Danilo Pereira","Fotos_Jugador/DaniloPereira.png","MEDIO",30,"Paris Saint-Germain","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("William Carvalho","Fotos_Jugador/WilliamCarvalho.png","MEDIO",30,"Real Betis","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Renato Sanches","Fotos_Jugador/RenatoSanches.png","MEDIO",24,"Lille","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ruben Neves","Fotos_Jugador/RubenNeves.png","MEDIO",25,"Wolverhampton Wanderers","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Matheus Nunes","Fotos_Jugador/MatheusNunes.jpg","MEDIO",23,"Sporting de Lisboa","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Otavio","Fotos_Jugador/Otavio.png","MEDIO",27,"Porto","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Joao Palhinha","Fotos_Jugador/JoaoPalhinha.jpg","MEDIO",26,"Sporting de Lisboa","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Andre Silva","Fotos_Jugador/AndreSilva.png","DELANTERO",26,"R.B. Leipzig","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Goncalo Guedes","Fotos_Jugador/GoncaloGuedes.png","DELANTERO",25,"Valencia","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Rafael Leao","Fotos_Jugador/RafaelLeao.png","DELANTERO",22,"AC Milan","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Diogo Jota","Fotos_Jugador/DiogoJota.jpg","DELANTERO",25,"Liverpool","",1);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Joao Felix","Fotos_Jugador/JoaoFelix.png","DELANTERO",22,"Atletico de Madrid","",1);

-- /////////////////////////////ARGENTINA
INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Franco Armani","Fotos_Jugador/FrancoArmani.png","PORTERO",35,"River Plate","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Geronimo Rulli","Fotos_Jugador/GeronimoRulli.png","PORTERO",29,"Villareal","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Juan Musso","Fotos_Jugador/JuanMusso.png","PORTERO",27,"Atalanta","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Nicolas Otamendi","Fotos_Jugador/NicolasOtamendi.png","DEFENSA",34,"Benfica","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("German Pezzella","Fotos_Jugador/GermanPezzela.png","DEFENSA",30,"Real Betis","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Nicolas Tagliafico","Fotos_Jugador/NicolasTagliafico.png","DEFENSA",29,"Ajax","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Lucas Martinez Quarta","Fotos_Jugador/LucasMartines.png","DEFENSA",25,"Fiorentina","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Gonzalo Montiel","Fotos_Jugador/GonzaloMontiel.jpg","DEFENSA",25,"Sevilla","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Juan Foyth","Fotos_Jugador/JuanFoyth.png","DEFENSA",24,"Villareal","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Nahuel Molina","Fotos_Jugador/NahuelMolina.png","DEFENSA",24,"Udinese","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Angel Di Maria","Fotos_Jugador/AngelDiMaria.png","MEDIO",34,"PSG","El Fideo",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Manuel Lanzini","Fotos_Jugador/ManuelLanzini.png","MEDIO",29,"West Ham","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Guido Rodriguez","Fotos_Jugador/GuidoRodriguez.png","MEDIO",28,"Real Betis","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Rodrigo de Paul","Fotos_Jugador/RodrigodePaul.png","MEDIO",27,"Atletico de Madrid","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Leandro Paredes","Fotos_Jugador/LeandroParedes.png","MEDIO",27,"PSG","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Lucas Ocampos","Fotos_Jugador/LucasOcampos.png","MEDIO",27,"Sevilla","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Nicolas Gonzalez","Fotos_Jugador/NicolasGonzalez.png","MEDIO",24,"Fiorentina","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Exequiel Palacios","Fotos_Jugador/ExequielPalacios.png","MEDIO",23,"Bayer Leverkusen","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Alexis Mac Allister","Fotos_Jugador/AlexisMacAllister.png","MEDIO",23,"Brighton","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Lionel Messi","Fotos_Jugador/LionelMessi.png","DELANTERO",34,"PSG","La pulga,Messias,GOAT,D10S",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Joaquin Correa","Fotos_Jugador/JuaquinCorrea.png","DELANTERO",27,"Inter de Milan","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Angel Correa","Fotos_Jugador/AngelCorrea.png","DELANTERO",27,"Atletico de Madrid","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Lucas Boye","Fotos_Jugador/LucasBoye.png","DELANTERO",26,"Elche","",4);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Julian Alvarez","Fotos_Jugador/JulianAlvarez.png","DELANTERO",22,"River Plate","",4);

-- ///////////////////////////////////ESTADOS UNIDOS
INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Zack Steffen","Fotos_Jugador/ZackSteffen.png","PORTERO",27,"Manchester City","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Sean Johnson","Fotos_Jugador/SeanJohnson.png","PORTERO",32,"New York City","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ethan Hovarth","Fotos_Jugador/EthanHovarth.jpg","PORTERO",26,"Nottingham Forest","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("DeAndre Yedlin","Fotos_Jugador/DeAndreYedlin.png","DEFENSA",28,"Inter Miami","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Walker Zimmerman","Fotos_Jugador/WalkerZimmerman.png","DEFENSA",28,"Nashville","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Reggie Cannon","Fotos_Jugador/ReggieCannon.png","DEFENSA",23,"Boavista","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Antonee Robinson","Fotos_Jugador/AntoneeRobinson.png","DEFENSA",24,"Fulham","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Aaron Long","Fotos_Jugador/AaronLong.png","DEFENSA",29,"New York Red Bulls","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Miles Robinson","Fotos_Jugador/MilesRobinson.png","DEFENSA",25,"Atlanta United","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("James Sands","Fotos_Jugador/JamesSands.png","DEFENSA",21,"Rangers","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("George Bello","Fotos_Jugador/GeorgeBello.png","DEFENSA",20,"Arminia","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Erik Palmer-Brown","Fotos_Jugador/ErikPalmer.png","DEFENSA",25,"Troyes","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Kellyn Acosta","Fotos_Jugador/KellynAcosta.png","MEDIO",26,"Los Angeles","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Cristian Roldan","Fotos_Jugador/CristianRoldan.png","MEDIO",26,"Seattle Sounders","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Tyler Adams","Fotos_Jugador/TylerAdams.png","MEDIO",23,"Leipzig","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Yunus Musah","Fotos_Jugador/YunusMusah.png","MEDIO",19,"Valencia","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Gianluca Busio","Fotos_Jugador/GianlucaBusio.png","MEDIO",19,"Venezia","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Luca de la Torre","Fotos_Jugador/LucadelaTorre.png","MEDIO",23,"Heracles","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Christian Pulisic","Fotos_Jugador/ChristianPulisic.png","DELANTERO",23,"Chelsea","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Jordan Morris","Fotos_Jugador/JordanMorris.png","DELANTERO",27,"Seattle Sounders","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Paul Arriola","Fotos_Jugador/PaulArriola.png","DELANTERO",27,"Dallas","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Tim Weah","Fotos_Jugador/TimWeah.png","DELANTERO",22,"Lille","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Giovanni Reyna","Fotos_Jugador/GiovanniReyna.png","DELANTERO",19,"Borussia Dortmund","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ricardo Pepi","Fotos_Jugador/RicardoPepi.png","DELANTERO",19,"Augsburgo","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Jordan Pefok","Fotos_Jugador/JordanPefok.jpg","DELANTERO",26,"Young Boys","",15);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Jesus Ferreira","Fotos_Jugador/JesusFerreira.png","DELANTERO",21,"Dallas","",15);

-- /////////////////////////////////////JAPON
INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Eji Kawashima","Fotos_Jugador/EjiKawashima.png","PORTERO",39,"RC Strasbourg","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Shuichi Gonda","Fotos_Jugador/ShuichiGonda.png","PORTERO",33,"Shimizu S-Pulse","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Kosei Tani","Fotos_Jugador/KoseiTani.png","PORTERO",21,"Shonan Bellmare","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Yuto Nagamoto","Fotos_Jugador/YutoNagamoto.png","DEFENSA",35,"F.C. Tokyo","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ko Itakura","Fotos_Jugador/KoItakura.png","DEFENSA",25,"Schalke 04","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Hiroki Sakai","Fotos_Jugador/HirokiSakai.png","DEFENSA",32,"Urawa Red Diamonds","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Maya Yoshida","Fotos_Jugador/MayaYoshida.png","DEFENSA",33,"Sampdoria","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Sei Muroya","Fotos_Jugador/SeiMuroya.png","DEFENSA",28,"Hannover 96","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Miki Yamane","Fotos_Jugador/MikiYamane.png","DEFENSA",28,"Kawasaki Frontale","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Yuta Nakayama","Fotos_Jugador/YutaNakayama.png","DEFENSA",25,"PEC Zwolle","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Takehiro Tomiyasu","Fotos_Jugador/TakehiroTomiyasu.png","DEFENSA",23,"Arsenal F.C","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Takumi Minamino","Fotos_Jugador/TakumiMinamino.png","MEDIO",27,"Liverpool F.C.","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Junya Ito","Fotos_Jugador/JunyaIto.png","MEDIO",29,"K.R.C. Genk","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Gaku Shibasaki","Fotos_Jugador/GakuShibasaki.png","MEDIO",29,"C.D. Leganes","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Hidemasa Morita","Fotos_Jugador/HidemasaMorita.png","MEDIO",26,"Club Deportivo Santa Clara","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Genki Haraguchi","Fotos_Jugador/GenkiHaraguchi.png","MEDIO",30,"Union Berlin","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Daichi Kamada","Fotos_Jugador/DaichiKamada.png","MEDIO",25,"Eintracht Frankfurt","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Wataru Endo","Fotos_Jugador/WataruEndo.png","MEDIO",29,"Stuttgart","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ao Tanaka","Fotos_Jugador/AoTanaka.png","MEDIO",23,"Fortuna Dusseldorf","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ritsu Doan","Fotos_Jugador/RitsuDoan.png","MEDIO",23,"PSV Eindhoven","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Kyogo Furuhashi","Fotos_Jugador/KyogoFuruhashi.png","DELANTERO",27,"Celtic F.C.","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Takuma Asano","Fotos_Jugador/TakumaAsano.png","DELANTERO",27,"VfL Bochum","",20);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Yoshinori Muto","Fotos_Jugador/YoshinoriMuto.png","DELANTERO",29,"Vissel Kobe","",20);

-- ////////////////////////////////SENEGAL 
INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Seny Dieng","Fotos_Jugador/SenyDieng.png","PORTERO",27,"Queens Park Rangers F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Edouard Mendy","Fotos_Jugador/EdouardMendy.png","PORTERO",30,"Chelsea F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Alfred Gomis","Fotos_Jugador/AlfredGomis.png","PORTERO",28,"Stade Rennes F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Saliou Ciss","Fotos_Jugador/SaliouCiss.png","DEFENSA",32,"A.S. Nancy-Lorraine","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Kalidou Koulibaly","Fotos_Jugador/KalidouKoulibaly.png","DEFENSA",30,"S.S.C. Napoli","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Pape Abou Cisse","Fotos_Jugador/PapeAbouCisse.png","DEFENSA",26,"Olympiakos F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Fode Ballo-Toure","Fotos_Jugador/FodeBallo.png","DEFENSA",25,"A.C. Milan","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Abdoulaye Seck","Fotos_Jugador/AbdoulayeSeck.jpg","DEFENSA",29,"Royale Antwerp F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Bouna Sarr","Fotos_Jugador/BounaSarr.png","DEFENSA",30,"Bayern Munich","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ibrahima Mbaye","Fotos_Jugador/IbrahimaMbaye.jpg","DEFENSA",27,"Bologna F.C. 1909","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Abdou Diallo","Fotos_Jugador/AbdouDiallo.png","DEFENSA",25,"Paris Saint-Germain F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Idrissa Gueye","Fotos_Jugador/IdrissaGueye.png","MEDIO",32,"Paris Saint-Germain F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Nampalys Mendy","Fotos_Jugador/NampalysMendy.png","MEDIO",29,"Leicester City F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Cheikhou Kouyate","Fotos_Jugador/CheikhouKouyate.png","MEDIO",32,"Crystal Palace F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Joseph Lopy","Fotos_Jugador/JosephLopy.png","MEDIO",30,"F.C. Sochaux-Montbeliard","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Pape Matar Sarr","Fotos_Jugador/PapeMatar.png","MEDIO",20,"F.C. Metz","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Moustapha Name","Fotos_Jugador/MoustaphaName.png","MEDIO",26,"Paris F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Mamadou Loum NDiaye","Fotos_Jugador/MamadouLoum.png","MEDIO",25,"Deportivo Alaves","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Pape Gueye","Fotos_Jugador/PapeGueye.png","MEDIO",23,"Olympique de Marsella","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Keita Balde","Fotos_Jugador/KeitaBalde.png","DELANTERO",27,"Cagliari Calcio","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Boulaye Dia","Fotos_Jugador/BoulayeDia.png","DELANTERO",25,"Villareal C.F.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Sadio Mane","Fotos_Jugador/SadioMane.png","DELANTERO",30,"Liverpool F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Habib Diallo","Fotos_Jugador/HabibDiallo.png","DELANTERO",26,"Racing Estrasburgo","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Bamba Dieng","Fotos_Jugador/BambaDieng.png","DELANTERO",22,"Olympique de Marsella","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ismaila Sarr","Fotos_Jugador/IsmailaSarr.png","DELANTERO",24,"Watford F.C.","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Famara Diedhiou","Fotos_Jugador/FamaraDiedhiou.png","DELANTERO",29,"Alanyaspor","",25);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Mame Thiam","Fotos_Jugador/MameThiam.png","DELANTERO",29,"Kayserispor","",25);

-- ////////////////////////////////////UNO CADA SELE
INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Thomas Muller","Fotos_Jugador/ThomasMuller.png","MEDIO",32,"Bayern Munich","",2);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Mohammed Al-Saiari","Fotos_Jugador/MohammedAl.png","DELANTERO",29,"Al-Hazem","",3);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Kevin De Bruyne","Fotos_Jugador/KevinDeBruyne.png","MEDIO",30,"Manchester City F.C.","",5);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Vinicius Junior","Fotos_Jugador/ViniciusJunior.png","DELANTERO",21,"Real Madrid C.F.","",6);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Erick Maxim Choupo-Moting","Fotos_Jugador/ErickMaxim.png","DELANTERO",33,"Bayern Munich","",7);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Alphonso Davies","Fotos_Jugador/AlphonsoDavies.png","MEDIO",21,"Bayern Munich","",8);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Almoez Ali","Fotos_Jugador/AlmoezAli.png","DELANTERO",25,"Al-Duhail","",9);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Lee Dong-gyeong","Fotos_Jugador/LeeDong.png","MEDIO",34,"Schalke 04","",10);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Luka Modric","Fotos_Jugador/LucaModric.png","MEDIO",36,"Real Madrid","",11);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Andreas Christensen","Fotos_Jugador/AndreasChristensen.png","DEFENSA",26,"Chelsea","",12);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Pervis Estupiñan","Fotos_Jugador/PervisEstupinan.png","DEFENSA",24,"C.F. Villareal","",13);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Rodri Hernandez","Fotos_Jugador/RodriHernandez.png","MEDIO",25,"Manchester City F.C.","",14);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Kylian Mbappe","Fotos_Jugador/KylianMbappe.jpg","DELANTERO",23,"Paris Saint-Germain F.C.","",16);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Thomas Partey","Fotos_Jugador/ThomasPartey.png","MEDIO",28,"Arsenal","",17);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Phil Foden","Fotos_Jugador/PhilFoden.png","MEDIO",21,"Manchester City","",18);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Sardar Azmoun","Fotos_Jugador/SardarAzmoun.jpg","DELANTERO",27,"Bayer 04 Leverkusen","",19);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Munir El Haddadi","Fotos_Jugador/MunirElHaddadi.png","DELANTERO",26,"Sevilla","",21);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Marcelo Flores","Fotos_Jugador/MarceloFlores.png","MEDIO",18,"Arsenal F.C.","",22);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Virgil van Dijk","Fotos_Jugador/VirgilVan.png","DEFENSA",30,"Liverpool F.C.","",23);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Robert Lewandowski","Fotos_Jugador/RobertLewandoski.jpg","DELANTERO",33,"Bayern Munich","",24);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Luka Jovic","Fotos_Jugador/LukaJovic.png","DELANTERO",24,"Real Madrid","",26);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Ruben Vargas","Fotos_Jugador/RubenVargas.jpg","DELANTERO",23,"FC Augsburg","",27);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Hannibal Mejbri","Fotos_Jugador/HannibalMejbri.png","MEDIO",19,"Manchester United","",28);

INSERT INTO Jugador(Nombre,Foto,Posicion,Edad,Equipo_Actual,Alias,idSeleccion)
VALUES("Federico Valverde","Fotos_Jugador/FedericoValverde.jpg","MEDIO",23,"Real Madrid","",29);

SELECT * FROM Seleccion;
SELECT * FROM Jugador;

-- //////////////////////////TRIVIA
INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Cuándo tuvo lugar la primera Copa Mundial de Fútbol","1930");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Quién es el máximo goleador de la historia de la Copa Mundial de Fútbol","Miroslav Klose");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Qué animal fue el escogido para ilustrar la mascota del Mundial de Rusia","Un Lobo");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("A qué futbolista se conoce con el apodo de Harry Potter","Ricardo Quaresma");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Dónde tendrá lugar la Copa Mundial de Fútbol de 2022","En Catar");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Cada 4 años, una empresa diferente fabrica el cuero con el que se juega el mundial","Falso");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Cuántos mundiales de fútbol ha ganado España","1");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Dónde se jugó la Copa del Mundial del año 2010","En Sudáfrica");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Qué jugador fue asesinado tras marcarse un gol en propia puerta","Andrés Escobar");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Qué equipo ganó el mundial en 1986","Argentina");

INSERT INTO Trivia(Pregunta,Respuesta)
VALUES ("Qué nombre recibe el balón oficial","Al Rihla");

SELECT * FROM Trivia;

-- ////////////////////////ARREGLAR REGISTROS
UPDATE Seleccion SET Pais="Dinamarca" WHERE idSeleccion = 12;