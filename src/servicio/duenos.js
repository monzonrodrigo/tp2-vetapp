import Dueno from '../modelo/Dueno.js'
import DuenosFactory from '../modelo/DAO/duenosFactory.js'
import config from '../config.js'
import ServicioMascotas from './mascotas.js'
import ServicioTurnos from './turnos.js'

class Servicio {
  #modelo = null

  constructor() {
    this.#modelo = DuenosFactory.get(config.MODO_PERSISTENCIA)
  }

  obtenerDuenos = async id => {
    if (id) {
      return await this.#modelo.obtenerDueno(id)
    }

    return await this.#modelo.obtenerDuenos()
  }

  guardarDueno = async datos => {
    const dueno = new Dueno(datos)
    dueno.validar()

    return await this.#modelo.guardarDueno(dueno.get())
  }

  actualizarDueno = async (id, datos) => {
    return await this.#modelo.actualizarDueno(id, datos)
  }

  borrarDueno = async id => {
    const servicioMascotas = new ServicioMascotas()
    const servicioTurnos = new ServicioTurnos()

    const mascotas = await servicioMascotas.obtenerMascotasPorDueno(id)

    for (const mascota of mascotas) {
      await servicioTurnos.borrarTurnosPorMascota(mascota._id.toString())
    }

    await servicioMascotas.borrarMascotasPorDueno(id)

    return await this.#modelo.borrarDueno(id)
  }
}

export default Servicio