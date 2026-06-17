import CnxMongoDB from '../modelo/DBMongo.js'
import { ObjectId } from 'mongodb'

class ChatbotService {
  procesarMensaje = async mensaje => {
    const texto = mensaje.toLowerCase().trim()

    if (texto.includes('ayuda') || texto === 'hola') {
      return this.#mensajeAyuda()
    }

    if (texto.includes('turnos pendientes')) {
      return await this.#obtenerTurnosPendientes()
    }

    if (texto.includes('turnos confirmados')) {
      return await this.#obtenerTurnosPorEstado('confirmado')
    }

    if (texto.includes('turnos cancelados')) {
      return await this.#obtenerTurnosPorEstado('cancelado')
    }

    if (texto.includes('turnos')) {
      return await this.#obtenerTodosTurnos()
    }

    if (texto.includes('mascotas')) {
      return await this.#obtenerTodasMascotas()
    }

    if (texto.includes('duenos') || texto.includes('dueños')) {
      return await this.#obtenerTodosDuenos()
    }

    return 'No entendi tu mensaje. Escribi ayuda para ver los comandos disponibles.'
  }

  #mensajeAyuda = () => {
    return `VetApp Chatbot

Comandos:
- turnos
- turnos pendientes
- turnos confirmados
- turnos cancelados
- mascotas
- duenos
- ayuda`
  }

  #obtenerTodosTurnos = async () => {
    try {
      const turnos = await CnxMongoDB.db.collection('turnos').find({}).toArray()

      if (turnos.length === 0) {
        return 'No hay turnos registrados.'
      }

      return await this.#formatearTurnos(turnos, 'Todos los Turnos')
    } catch {
      return 'Error al obtener turnos.'
    }
  }

  #obtenerTurnosPendientes = async () => {
    try {
      const turnos = await CnxMongoDB.db
        .collection('turnos')
        .find({ estado: 'pendiente' })
        .toArray()

      if (turnos.length === 0) {
        return 'No hay turnos pendientes.'
      }

      return await this.#formatearTurnos(turnos, 'Turnos Pendientes')
    } catch {
      return 'Error al obtener turnos pendientes.'
    }
  }

  #obtenerTurnosPorEstado = async estado => {
    try {
      const turnos = await CnxMongoDB.db
        .collection('turnos')
        .find({ estado })
        .toArray()

      if (turnos.length === 0) {
        return `No hay turnos ${estado}s.`
      }

      return await this.#formatearTurnos(turnos, `Turnos ${estado}s`)
    } catch {
      return `Error al obtener turnos ${estado}s.`
    }
  }

  #formatearTurnos = async (turnos, titulo) => {
    let respuesta = `${titulo} (${turnos.length})\n\n`

    for (const t of turnos) {
      let nombreMascota = 'Desconocida'
      let nombreDueno = 'Desconocido'
      let telefonoDueno = ''

      try {
        const mascota = await CnxMongoDB.db
          .collection('mascotas')
          .findOne({ _id: new ObjectId(t.mascota_id) })

        if (mascota) {
          nombreMascota = `${mascota.nombre} (${mascota.especie})`

          const dueno = await CnxMongoDB.db
            .collection('duenos')
            .findOne({ _id: new ObjectId(mascota.dueno_id) })

          if (dueno) {
            nombreDueno = dueno.nombre
            telefonoDueno = dueno.telefono
          }
        }
      } catch {}

      respuesta += `${t.fecha} - ${t.hora}
Motivo: ${t.motivo}
Mascota: ${nombreMascota}
Dueno: ${nombreDueno} (${telefonoDueno})
Estado: ${t.estado}

`
    }

    return respuesta
  }

  #obtenerTodasMascotas = async () => {
    try {
      const mascotas = await CnxMongoDB.db.collection('mascotas').find({}).toArray()

      if (mascotas.length === 0) {
        return 'No hay mascotas registradas.'
      }

      let respuesta = `Mascotas (${mascotas.length})\n\n`

      for (const m of mascotas) {
        let nombreDueno = 'Desconocido'
        let telefonoDueno = ''

        try {
          const dueno = await CnxMongoDB.db
            .collection('duenos')
            .findOne({ _id: new ObjectId(m.dueno_id) })

          if (dueno) {
            nombreDueno = dueno.nombre
            telefonoDueno = dueno.telefono
          }
        } catch {}

        respuesta += `${m.nombre} (${m.especie})
Raza: ${m.raza || 'No especificada'}
Dueno: ${nombreDueno} (${telefonoDueno})

`
      }

      return respuesta
    } catch {
      return 'Error al obtener mascotas.'
    }
  }

  #obtenerTodosDuenos = async () => {
    try {
      const duenos = await CnxMongoDB.db.collection('duenos').find({}).toArray()

      if (duenos.length === 0) {
        return 'No hay duenos registrados.'
      }

      let respuesta = `Duenos (${duenos.length})\n\n`

      for (const d of duenos) {
        const mascotas = await CnxMongoDB.db
          .collection('mascotas')
          .find({ dueno_id: d._id.toString() })
          .toArray()

        respuesta += `${d.nombre}
Tel: ${d.telefono}
Email: ${d.email}
Mascotas: ${
          mascotas.length > 0
            ? mascotas.map(m => m.nombre).join(', ')
            : 'Sin mascotas'
        }

`
      }

      return respuesta
    } catch {
      return 'Error al obtener duenos.'
    }
  }
}

export default ChatbotService