const nombre = document.getElementById('nombre');
const documento = document.getElementById('documento');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const btnNuevo = document.getElementById('btn-nuevo');
const listaconsultas = document.getElementById('lista-consultas');
const listamascotas = document.getElementById('mascota');
const listaveterinarias = document.getElementById('veterinaria');
const historia = document.getElementById('historia');
const diagnostico = document.getElementById('diagnostico');
const tittleModal = document.getElementById('exampleModalCenterTitle');

const url = "https://backend-veterinaria.now.sh";

let consultas = [];
let mascotas = [];
let veterinarias = [];

async function listarMascotas() {
  const entidad = 'mascotas';
  try {
    const respuesta = await fetch(`${url}/${entidad}`);
    const mascotasDelServer = await respuesta.json();
    if (Array.isArray(mascotasDelServer)) {
      mascotas = mascotasDelServer;
    }
    if (mascotas.length > 0) {
      const htmlmascotas = mascotas
        .map((mascota, index) => `<option value="${index}">${mascota.nombre}</option>`).join("");
      
        listamascotas.innerHTML += htmlmascotas;
      return
    }
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

async function listarVetrinarias() {
  const entidad = 'veterinarias';
  try {
    const respuesta = await fetch(`${url}/${entidad}`);
    const veterinariasDelServer = await respuesta.json();
    if (Array.isArray(veterinariasDelServer)) {
      veterinarias = veterinariasDelServer;
    }
    if (veterinarias.length > 0) {
      veterinarias.forEach((veterinaria, indice) => {
        const optionActual = document.createElement("option");
        optionActual.innerHTML = veterinaria.nombre;
        optionActual.value = indice;
        listaveterinarias.appendChild(optionActual);
      });
      return
    }
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

async function listarconsultas() {
  const entidad = 'consultas';
  try {
    const respuesta = await fetch(`${url}/${entidad}`);
    const consultasDelServer = await respuesta.json();
    if (Array.isArray(consultasDelServer)) {
      consultas = consultasDelServer;
    }
    if (consultas.length > 0) {
      const htmlconsultas = consultas.map((consulta, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${consulta.veterinaria.nombre}</td>
        <td>${consulta.mascota.nombre} - ${consulta.mascota.tipo}</td>
        <td>${consulta.historia}</td>
        <td>${consulta.diagnostico}</td>
        <td>${consulta.fechaCreacion.split('T')[0]}</td>
        <td>${consulta.fechaEdicion.split('T')[0]}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
      </tr>`).join("");
      listaconsultas.innerHTML = htmlconsultas;
      Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
      Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
      return
    }
    listaconsultas.innerHTML = `<tr>
        <td colspan="5" class="lista-vacia">No hay Dueños</td>
      </tr>`;
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

async function enviarDatos(evento) {
  evento.preventDefault();
  try {
    const datos = {
      mascota: listamascotas.value,
      veterinaria: listaveterinarias.value,
      historia: historia.value,
      diagnostico: diagnostico.value
    };
    if(validar(datos)) {
      const accion = btnGuardar.innerHTML;
      let method = 'POST';
      let urlEnvio = `${url}/consultas`;
      if (accion === 'Editar') {
        urlEnvio += `/${indice.value}`;
        method = 'PUT';
        consultas[indice.value] = datos;
      }
      const respuesta = await fetch(urlEnvio, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
      if (respuesta.ok) {
        listarconsultas();
        resetModal();
        $('#exampleModalCenter').modal('toggle');
      }
      form.classList.add("was-validated");
      return;
    }
    $("#alert-datos").show();
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

function editar(index) {
  return function cuandoCliqueo() {
    $("#alert-datos").hide();
    btnGuardar.innerHTML = 'Editar'
    tittleModal.innerHTML ="Editar Consulta"
    $('#exampleModalCenter').modal('toggle');
    const consulta = consultas[index];
    indice.value = index;
    listamascotas.value = consulta.mascota.id;
    listaveterinarias.value = consulta.veterinaria.id;
    historia.value = consulta.historia;
    diagnostico.value = consulta.diagnostico;
    removeClassForm();
  }
}

function removeClassForm() {
  [listamascotas, listaveterinarias, historia, diagnostico].forEach((inputActual) => {
    inputActual.classList.remove("is-invalid");
    inputActual.classList.remove("is-valid");
  });
}

function resetModal() {
  $("#alert-datos").hide();
  indice.value = '';
  listamascotas.value = $("#mascota option:first").val();
  listaveterinarias.value = $("#veterinaria option:first").val();
  historia.value = '';
  diagnostico.value = $("#diagnostico option:first").val();
  btnGuardar.innerHTML = 'Crear'
  tittleModal.innerHTML ="Nueva Consulta"
  removeClassForm();
}

function eliminar(index) {
  let urlEnvio = `${url}/consultas/${index}`;
  return async function clickEnEliminar() {
    try {
      const respuesta = await fetch(urlEnvio, {
        method: 'DELETE'
      });
      if (respuesta.ok) {
      listarconsultas();
      }
    } catch (error) {
      console.log({ error });
      $(".alert").show();;
    }
  }
}

function validar(datos) {
  if (typeof datos !== "object") return false;
  let respuesta = true;
  for (let llave in datos) {
    if (datos[llave].length === 0) {
      document.getElementById(llave).classList.add("is-invalid");
      respuesta = false;
    } else {
      document.getElementById(llave).classList.remove("is-invalid");
      document.getElementById(llave).classList.add("is-valid");
    }
  }
  return respuesta;
}

listarconsultas();
listarMascotas();
listarVetrinarias();

//form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;