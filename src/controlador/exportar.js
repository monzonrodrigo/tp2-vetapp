import Servicio from '../servicio/exportar.js'

class Controlador {
    #servicio = null

    constructor() { this.#servicio = new Servicio() }
    descargarHistoriaClinica = async (req, res) => {
        try {
            const { mascota_id } = req.params
            const { nombreArchivo, contenidoTxt } =
                await this.#servicio.generarHistoriaClinica(mascota_id)
            res.setHeader('Content-disposition', `attachment; filename=${nombreArchivo}`)
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.send(contenidoTxt)
        } catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }
}

export default Controlador