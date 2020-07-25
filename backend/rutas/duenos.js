module.exports = function duenosHandler(duenos) {
  return  {
    get: (data, callback) => { // handler
      if (data.indice) {
        if (duenos[data.indice]) {
          return callback(200, duenos[data.indice]);
        }
        return callback(404, {
          mensaje: `dueños con indice ${data.indice} no encontrada`
        });
      }
      callback(200, duenos);
    },
    post: (data, callback) => { // handler
      //console.log('handler', {data});
      duenos.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => { // handler
      if (data.indice) {
        if (duenos[data.indice]) {
          duenos[data.indice] = data.payload;
          return callback(200, duenos[data.indice]);
        }
        return callback(404, {
          mensaje: `dueños con indice ${data.indice} no encontrada`
        });
      }
      callback(400, {
        mensaje: "indice no enviado"
      });
    },
    delete: (data, callback) => { // handler
      if (data.indice) {
        if (duenos[data.indice]) {
          //duenos.splice(data.indice, 1);

          duenos = duenos.filter(
            (_duenosActual, indice) => indice != data.indice
          );

          return callback(200, {
            mensaje: 'eliminado con exito'
          });
        }
        return callback(404, {
          mensaje: `dueños con indice ${data.indice} no encontrada`
        });
      }
      callback(400, {
        mensaje: "indice no enviado"
      });
    }
  }
}


