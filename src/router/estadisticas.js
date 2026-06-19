import express from 'express'
import Controlador from '../controlador/estadisticas.js'

class Router {
    #controlador = null

    constructor() { this.#controlador = new Controlador() }
    config() {
        const router = express.Router()
        router.get('/turnos', this.#controlador.obtenerMetricasTurnos)
        return router
    }
}

export default Router