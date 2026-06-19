import Servicio from '../servicio/estadisticas.js'

class Controlador {
    #servicio = null

    constructor() { this.#servicio = new Servicio() }
    obtenerMetricasTurnos = async (req, res) => {
        try {
            const metricas = await this.#servicio.calcularMetricas()
            res.json(metricas)
        } catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }
}

export default Controlador