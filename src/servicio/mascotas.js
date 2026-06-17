import Mascota from '../modelo/Mascota.js'
import MascotasFactory from '../modelo/DAO/mascotasFactory.js'
import config from '../config.js'

class Servicio {
    #modelo = null
    
    constructor() {
        this.#modelo = MascotasFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerMascotas = async id => {
        if (id) return await this.#modelo.obtenerMascota(id)
        return await this.#modelo.obtenerMascotas()
    }

    guardarMascota = async datos => {
        const mascota = new Mascota(datos)
        mascota.validar()
        return await this.#modelo.guardarMascota(mascota.get())
    }

    actualizarMascota = async (id, datos) => {
        return await this.#modelo.actualizarMascota(id, datos)
    }

    borrarMascota = async id => {
        return await this.#modelo.borrarMascota(id)
    }

    obtenerMascotasPorDueno = async dueno_id => {
        return await this.#modelo.obtenerMascotasPorDueno(dueno_id)
    }

    borrarMascotasPorDueno = async dueno_id => {
        return await this.#modelo.borrarMascotasPorDueno(dueno_id)
    }
}

export default Servicio