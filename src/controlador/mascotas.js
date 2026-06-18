import Servicio from "../servicio/mascotas.js";

class Controlador {
  #servicio = null;

  constructor() {
    this.#servicio = new Servicio();
  }

  obtenerMascotas = async (req, res) => {
    try {
      const { id } = req.params;
      const mascotas = await this.#servicio.obtenerMascotas(id);
      res.json(mascotas);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  guardarMascota = async (req, res) => {
    try {
      const datos = req.body;
      if (Object.keys(datos).length === 0)
        throw new Error("El cuerpo esta vacio");
      const mascota = await this.#servicio.guardarMascota(datos);
      res.json(mascota);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  actualizarMascota = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
      const mascota = await this.#servicio.actualizarMascota(id, datos);
      res.json(mascota);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  borrarMascota = async (req, res) => {
    try {
      const { id } = req.params;
      const mascota = await this.#servicio.borrarMascota(id);
      res.json(mascota);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  obtenerMascotasPorDueno = async (req, res) => {
    try {
      const { dueno_id } = req.params;
      const mascotas = await this.#servicio.obtenerMascotasPorDueno(dueno_id);
      res.json(mascotas);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };
}

export default Controlador;
