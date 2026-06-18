import express from "express";
import Controlador from "../controlador/mascotas.js";

class Router {
  #controlador = null;

  constructor() {
    this.#controlador = new Controlador();
  }

  config() {
    const router = express.Router();

    router.get("/dueno/:dueno_id", this.#controlador.obtenerMascotasPorDueno);
    router.get("/", this.#controlador.obtenerMascotas);
    router.get("/:id", this.#controlador.obtenerMascotas);
    router.post("/", this.#controlador.guardarMascota);
    router.put("/:id", this.#controlador.actualizarMascota);
    router.delete("/:id", this.#controlador.borrarMascota);

    return router;
  }
}

export default Router;
