const nombre = document.getElementById('nombre');
const direccion = document.getElementById('direccion');
const telefono = document.getElementById('telefono');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const btnNuevo = document.getElementById('btn-nuevo');
const listaVeterinarias = document.getElementById('lista-veterinarias');
const tittleModal = document.getElementById('exampleModalCenterTitle');
const url = "https://backend-veterinaria.now.sh/veterinarias";

let veterinarias = [];

async function listarVeterinarias() {
  try {
    const respuesta = await fetch(url);
    const veterinariasDelServer = await respuesta.json();
    if (Array.isArray(veterinariasDelServer)) {
      veterinarias = veterinariasDelServer;
    }
    if (veterinarias.length > 0) {
      const htmlVeterinarias = veterinarias.map((veterinaria, index)=>`<tr>
      <th scope="row">${index}</th>
      <td>${veterinaria.nombre}</td>
      <td>${veterinaria.direccion}</td>
      <td>${veterinaria.telefono}</td>
      <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
      </td>
      </tr>`).join("");
      listaVeterinarias.innerHTML = htmlVeterinarias;
      Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
      Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
      return;
    }
    listaVeterinarias.innerHTML = `<tr>
        <td colspan="5" class="lista-vacia">No hay veterinarias</td>
      </tr>`;
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

async function enviarDatos(evento) {
  try {
    evento.preventDefault();
    const datos = {
      nombre: nombre.value,
      direccion: direccion.value,
      telefono: telefono.value
    };
    const accion = btnGuardar.innerHTML;
    let method = 'POST';
    let urlEnvio = url;
    if(accion === 'Editar') {
      urlEnvio += `/${indice.value}`;
      method = 'PUT';
      veterinarias[indice.value] = datos;
    }
    const respuesta = await fetch(urlEnvio, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });
    if (respuesta.ok) {
      listarVeterinarias();
      resetModal();
    }
  } catch (error) {
    console.log({ error });
    $(".alert").show();;
  }
}

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = 'Editar'
    tittleModal.innerHTML = 'Editar Veterinaria'
    $('#exampleModalCenter').modal('toggle');
    const veterinaria = veterinarias[index];
    indice.value = index;
    nombre.value = veterinaria.nombre;
    telefono.value = veterinaria.telefono;
    direccion.value = veterinaria.direccion;
  }
}

function resetModal() {
  indice.value = '';
  nombre.value = '';
  telefono.value = '';
  direccion.value = '';
  tittleModal.innerHTML = 'Nueva Veterinaria'
  btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
  let urlEnvio = `${url}/${index}`;
  return async function clickEnEliminar() {
    try {
      const respuesta = await fetch(urlEnvio, {
        method: 'DELETE'
      });
      if (respuesta.ok) {
      listarVeterinarias();
      }
    } catch (error) {
      console.log({ error });
      $(".alert").show();;
    }
  }
}

listarVeterinarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;