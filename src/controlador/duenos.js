import Servicio from "../servicio/duenos.js";

class Controlador {
  #servicio = null;

  constructor() {
    this.#servicio = new Servicio();
  }

  obtenerDuenos = async (req, res) => {
    try {
      const { id } = req.params;
      const duenos = await this.#servicio.obtenerDuenos(id);

      res.json(duenos);
    } catch (error) {
      res.status(500).json({
        url: req.url,
        method: req.method,
        error: error.message,
      });
    }
  };

  guardarDueno = async (req, res) => {
    try {
      const datos = req.body;

      if (Object.keys(datos).length === 0) {
        throw new Error("El cuerpo esta vacio");
      }

      const dueno = await this.#servicio.guardarDueno(datos);

      res.json(dueno);
    } catch (error) {
      res.status(500).json({
        url: req.url,
        method: req.method,
        error: error.message,
      });
    }
  };

  actualizarDueno = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;

      const dueno = await this.#servicio.actualizarDueno(id, datos);

      res.json(dueno);
    } catch (error) {
      res.status(500).json({
        url: req.url,
        method: req.method,
        error: error.message,
      });
    }
  };

  borrarDueno = async (req, res) => {
    try {
      const { id } = req.params;
      const dueno = await this.#servicio.borrarDueno(id);

      res.json(dueno);
    } catch (error) {
      res.status(500).json({
        url: req.url,
        method: req.method,
        error: error.message,
      });
    }
  };
}

export default Controlador;
