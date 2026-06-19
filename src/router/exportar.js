import express from 'express'
import Controlador from '../controlador/exportar.js'

class Router {
    #controlador = null

    constructor() { this.#controlador = new Controlador() }
    config() {
        const router = express.Router()
        router.get('/historia-clinica/:mascota_id',
            this.#controlador.descargarHistoriaClinica)
        return router
    }
}

export default Router