import express from "express";
import Controlador from "../controlador/mascotas.js";

/**
* @swagger
* tags:
* name: Mascotas
* description: Gestion de mascotas
*/
/**
* @swagger
* /api/mascotas:
* get:
* summary: Obtener todas las mascotas
* tags: [Mascotas]
* responses:
* 200:
* description: Lista de mascotas
* post:
* summary: Crear una nueva mascota
* tags: [Mascotas]
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* required: [nombre, especie, dueno_id]
* properties:
* nombre:
* type: string
* especie:
* type: string
* raza:
* type: string
* fechaNacimiento:
* type: string
* dueno_id:
* type: string
* responses:
* 200:
* description: Mascota creada
* /api/mascotas/{id}:
* get:
* summary: Obtener una mascota por ID
* tags: [Mascotas]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* responses:
* 200:
* description: Mascota encontrada
* put:
* summary: Actualizar una mascota
* tags: [Mascotas]
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
* description: Mascota actualizada
* delete:
* summary: Borrar una mascota
* tags: [Mascotas]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: string
* responses:
* 200:
* description: Mascota eliminada
* /api/mascotas/dueno/{dueno_id}:
* get:
* summary: Obtener mascotas por dueno
* tags: [Mascotas]
* parameters:
* - in: path
* name: dueno_id
* required: true
* schema:
* type: string
* responses:
* 200:
* description: Mascotas del dueno
*/

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
