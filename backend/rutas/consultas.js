module.exports = function consultasHandler({
    consultas,
    veterinarias,
    mascotas
}) {
  return  {
    get: (data, callback) => { // handler
      if (data.indice) {
        if (consultas[data.indice]) {
          return callback(200, consultas[data.indice]);
        }
        return callback(404, {
          mensaje: `consulta con indice ${data.indice} no encontrada`
        });
      }
      const consultasConRelaciones = consultas.map((consulta) => ({
        ...consulta,
        mascota: { ...mascotas[consulta.mascota], id: consulta.mascota },
        veterinaria: { ...veterinarias[consulta.veterinaria], id: consulta.veterinaria }
      }));
      callback(200, consultasConRelaciones);
    },
    post: (data, callback) => { // handler
      //console.log('handler', {data});
      let nuevaConsulta = data.payload;
      nuevaConsulta.fechaCreacion = new Date();
      nuevaConsulta.fechaEdicion = new Date();
      
      // Mala practica por que inmuta
      //consultas.push(consulta);

      consultas = [...consultas, nuevaConsulta];
      callback(201, nuevaConsulta);
    },
    put: (data, callback) => { // handler
      if (data.indice) {
        if (consultas[data.indice]) {
          const { fechaCreacion } = consultas[data.indice];
          consultas[data.indice] = {
            ...data.payload,
            fechaCreacion,
            fechaEdicion: new Date()
          };
          return callback(200, consultas[data.indice]);
        }
        return callback(404, {
          mensaje: `consulta con indice ${data.indice} no encontrada`
        });
      }
      callback(400, {
        mensaje: "indice no enviado"
      });
    },
    delete: (data, callback) => { // handler
      if (data.indice) {
        if (consultas[data.indice]) {
          //consultas.splice(data.indice, 1);

          consultas = consultas.filter(
            (_consultasActual, indice) => indice != data.indice
          );

          return callback(200, {
            mensaje: 'eliminado con exito'
          });
        }
        return callback(404, {
          mensaje: `consulta con indice ${data.indice} no encontrada`
        });
      }
      callback(400, {
        mensaje: "indice no enviado"
      });
    }
  }
}