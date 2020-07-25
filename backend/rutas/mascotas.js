module.exports = function mascotasHandler(mascotas) {
  return  {
    get: (data, callback) => { // handler
      if (data.indice) {
        if (mascotas[data.indice]) {
          return callback(200, mascotas[data.indice]);
        }
        return callback(404, {
          mensaje: `mascota con indice ${data.indice} no encontrada`
        });
      }
      callback(200, mascotas);
    },
    post: (data, callback) => { // handler
      //console.log('handler', {data});
      mascotas.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => { // handler
      if (data.indice) {
        if (mascotas[data.indice]) {
          mascotas[data.indice] = data.payload;
          return callback(200, mascotas[data.indice]);
        }
        return callback(404, {
          mensaje: `mascota con indice ${data.indice} no encontrada`
        });
      }
      callback(400, {
        mensaje: "indice no enviado"
      });
    },
    delete: (data, callback) => { // handler
      if (data.indice) {
        if (mascotas[data.indice]) {
          //mascotas.splice(data.indice, 1);

          mascotas = mascotas.filter(
            (_mascotaActual, indice) => indice != data.indice
          );

          return callback(200, {
            mensaje: 'eliminado con exito'
          });
        }
        return callback(404, {
          mensaje: `mascota con indice ${data.indice} no encontrada`
        });
      }
      callback(400, {
        mensaje: "indice no enviado"
      });
    }
  }
}


