const { v4: uuidv4 } = require("uuid");
// How to use: uuidv4(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
const baseCharacter = {
    //  id:uuidv4(),
    imagen: "A",
    nombre: "W",
    edad: "W",
    peso: "W",
    historia: "W",
  };
const baseMovie = {
    //  id:uuidv4(),
    imagen:"e",
    titulo:"s",
    fechaCreacion: Date.now().toString(),
    calificacion:3,
}
const baseGenero = {
  //   id:uuidv4(),
    nombre:"e",
    imagen:"ss"
}
const baseUser = {
    username:"da",
    password:"asf"
}
module.exports = {
    baseCharacter,
    baseMovie,
    baseGenero,
    baseUser
}