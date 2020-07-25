const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');

module.exports = (req, res) => {
  const urlParse = url.parse(req.url, true);
  const ruta = urlParse.pathname;

  const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');

  // Obtener variables del query
  const {
    query = {}
  } = urlParse;

  // Obtener metodo http
  const metodo = req.method.toLowerCase();

  // Dar permisos de CORS

  res.setHeader("Access-Control-Allow-Origin", "*");
  //res.setHeader("Access-Control-Request-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  
  // respuesta inmediata cuando el metodo sea options
  // Valida que el navegador si tenga comunicacion con la api
  if (metodo === 'options') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Obtener headers
  const {
    headers = {}
  } = req;

  // Obyener payload, en el caso de haber uno
  // Es dividir el mensaje por partes en el caso de mandar archivos
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  // Ir aculumando la data cuando el request reciba un payload
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  // Deja de acumular datos y dejar al decoder que finalice
  req.on('end', () => {
    buffer += decoder.end();

    if (headers["content-type"] === "application/json") {
      buffer = JSON.parse(buffer);
    }

    if (rutaLimpia.indexOf('/') > -1) {
      // Separar las rutas
      var [rutaPrincipal, indice] = rutaLimpia.split('/');
    }

    // Ordenar la data
    const data = {
      indice,
      ruta: rutaPrincipal || rutaLimpia,
      query,
      metodo,
      headers,
      payload: buffer
    };
    // Elegit el manejador dependiendo de la ruta y asignarle la funcion que el enrutador tiene //handler
    let handler;
    if (data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
      handler = enrutador[data.ruta][metodo];
    } else {
      handler = enrutador.noEncontrado;
    }

    // Ejecutar handler {manejador} para enviar la respuesta
    if (typeof handler === 'function') {
      handler(data, (statusCode = 200, mensaje) => {
        const respuesta = JSON.stringify(mensaje);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);

        // linea donde realmente ya estamos respondiendo a la alicacion cliente
        res.end(respuesta);
      });
    }
  });
}