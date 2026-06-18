import express from "express";
import Controlador from "../controlador/duenos.js";

class Router {
  #controlador = null;

  constructor() {
    this.#controlador = new Controlador();
  }

  config() {
    const router = express.Router();

    router.get("/", this.#controlador.obtenerDuenos);
    router.get("/:id", this.#controlador.obtenerDuenos);
    router.post("/", this.#controlador.guardarDueno);
    router.put("/:id", this.#controlador.actualizarDueno);
    router.delete("/:id", this.#controlador.borrarDueno);

    return router;
  }
}

export default Router;
