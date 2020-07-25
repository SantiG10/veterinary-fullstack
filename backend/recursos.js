module.exports = {
  mascotas: [{
      tipo: "Perro",
      nombre: "Trosqui",
      dueno: "Santiago"
    },
    {
      tipo: "Perro",
      nombre: "Max",
      dueno: "Jorge"
    },
    {
      tipo: "Gato",
      nombre: "Dulce",
      dueno: "Luciana"
    },
    {
      tipo: "Gato",
      nombre: "Cuba",
      dueno: "Laura"
    }
  ],
  veterinarias: [{
      nombre: "Salud Perros",
      direccion: "Cll 4 F",
      telefono: "1234567890"
    },
    {
      nombre: "Salud Gatos",
      direccion: "Cll 4 F",
      telefono: "1234567890"
    },
    {
      nombre: "Salud Gatos",
      direccion: "Cll 4 F",
      telefono: "1234567890"
    },
    {
      nombre: "Salud Perrino",
      direccion: "Cll 4 F",
      telefono: "1234567890"
    }
  ],
  duenos: [{
      nombre: "Santiago",
      apellido: "Giraldo",
      documento: "1234567890"
    },
    {
      nombre: "Juan",
      apellido: "Zapata",
      documento: "1234567890"
    },
    {
      nombre: "Jenniffer",
      apellido: "Marin",
      documento: "1234567890"
    },
    {
      nombre: "Sandra",
      apellido: "Cubana",
      documento: "1234567890"
    }
  ],
    consultas: [{
      veterinaria: 0,
      mascota: 0,
      fechaCreacion: new Date(),
      fechaEdicion: new Date(),
      historia: '',
      diagnostico: 'Enfermedad general',
    },
    {
      veterinaria: 1,
      mascota: 1,
      fechaCreacion: new Date(),
      fechaEdicion: new Date(),
      historia: '',
      diagnostico: 'Virus',
    },
    {
      veterinaria: 3,
      mascota: 2,
      fechaCreacion: new Date(),
      fechaEdicion: new Date(),
      historia: '',
      diagnostico: 'Enfermedad general',
    },
    {
      veterinaria: 2,
      mascota: 3,
      fechaCreacion: new Date(),
      fechaEdicion: new Date(),
      historia: '',
      diagnostico: 'Virus',
    }
  ]
}