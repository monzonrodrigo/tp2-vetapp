import express from "express";
import Controlador from "../controlador/turnos.js";
/**
 * @swagger
 * tags:
 * name: Turnos
 * description: Gestion de turnos veterinarios
 */
/**
 * @swagger
 * /api/turnos:
 * get:
 * summary: Obtener todos los turnos
 * tags: [Turnos]
 * responses:
 * 200:
 * description: Lista de turnos
 * post:
 * summary: Crear un nuevo turno
 * tags: [Turnos]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [fecha, hora, motivo, mascota_id]
 * properties:
 * fecha:
 * type: string
 * hora:
 * type: string
 * motivo:
 * type: string
 * mascota_id:
 * type: string
 * estado:
 * type: string
 * enum: [pendiente, confirmado, cancelado]
 * responses:
 * 200:
 * description: Turno creado
 * /api/turnos/{id}:
 * get:
 * summary: Obtener un turno por ID
 * tags: [Turnos]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Turno encontrado
 * put:
 * summary: Actualizar un turno
 * tags: [Turnos]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * responses:
 * 200:
 * description: Turno actualizado
 * delete:
 * summary: Borrar un turno
 * tags: [Turnos]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Turno eliminado
 * /api/turnos/mascota/{mascota_id}:
 * get:
 * summary: Obtener turnos por mascota
 * tags: [Turnos]
 * parameters:
 * - in: path
 * name: mascota_id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Turnos de la mascota
 */
class Router {
  #controlador = null;
  constructor() {
    this.#controlador = new Controlador();
  }
  config() {
    const router = express.Router();
    router.get(
      "/mascota/:mascota_id",
      this.#controlador.obtenerTurnosPorMascota,
    );
    router.get("{/:id}", this.#controlador.obtenerTurnos);
    router.post("/", this.#controlador.guardarTurno);
    router.put("/:id", this.#controlador.actualizarTurno);
    router.delete("/:id", this.#controlador.borrarTurno);
    return router;
  }
}
export default Router;
