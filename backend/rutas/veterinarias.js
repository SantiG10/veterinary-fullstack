module.exports = function veterinariasHandler(veterinarias) {
  return  {
    get: (data, callback) => { // handler
      if (data.indice) {
        if (veterinarias[data.indice]) {
          return callback(200, veterinarias[data.indice]);
        }
        return callback(404, {
          mensaje: `veterinaria con indice ${data.indice} no encontrada`
        });
      }
      callback(200, veterinarias);
    },
    post: (data, callback) => { // handler
      //console.log('handler', {data});
      veterinarias.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => { // handler
      if (data.indice) {
        if (veterinarias[data.indice]) {
          veterinarias[data.indice] = data.payload;
          return callback(200, veterinarias[data.indice]);
        }
        return callback(404, {
          mensaje: `veterinaria con indice ${data.indice} no encontrada`
        });
      }
      callback(400, {
        mensaje: "indice no enviado"
      });
    },
    delete: (data, callback) => { // handler
      if (data.indice) {
        if (veterinarias[data.indice]) {
          //veterinarias.splice(data.indice, 1);

          veterinarias = veterinarias.filter(
            (_veterinariaActual, indice) => indice != data.indice
          );

          return callback(200, {
            mensaje: 'eliminado con exito'
          });
        }
        return callback(404, {
          mensaje: `veterinaria con indice ${data.indice} no encontrada`
        });
      }
      callback(400, {
        mensaje: "indice no enviado"
      });
    }
  }
}


