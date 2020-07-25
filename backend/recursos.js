module.exports = {
  mascotas: [{
      tipo: "Perro",
      nombre: "Trosqui",
      dueno: "Santiago Giraldo"
    },
    {
      tipo: "Perro",
      nombre: "Max",
      dueno: "Jenniffer Marin"
    },
    {
      tipo: "Gato",
      nombre: "Dulce",
      dueno: "Juan Zapata"
    },
    {
      tipo: "Gato",
      nombre: "Cuba",
      dueno: "Sandra Cuba"
    }
  ],
  veterinarias: [{
      nombre: "Salud Perros",
      direccion: "Cll 4 F # 78",
      telefono: "1234567890"
    },
    {
      nombre: "Salud Gatos",
      direccion: "Cll 8A # 89",
      telefono: "5343455343"
    },
    {
      nombre: "Salud Loros",
      direccion: "Cll 3C # 76",
      telefono: "566232355"
    },
    {
      nombre: "Salud Lagartos",
      direccion: "Cll 8D # 98",
      telefono: "7643434234"
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