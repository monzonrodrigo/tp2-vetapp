import express from 'express'
import Controlador from '../controlador/duenos.js'

/**
 * @swagger
 * tags:
 *   name: Duenos
 *   description: Gestion de duenos de mascotas
 */

/**
 * @swagger
 * /api/duenos:
 *   get:
 *     summary: Obtener todos los duenos
 *     tags: [Duenos]
 *     responses:
 *       200:
 *         description: Lista de duenos
 *   post:
 *     summary: Crear un nuevo dueno
 *     tags: [Duenos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, telefono, email]
 *             properties:
 *               nombre:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dueno creado
 * /api/duenos/{id}:
 *   get:
 *     summary: Obtener un dueno por ID
 *     tags: [Duenos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dueno encontrado
 *   put:
 *     summary: Actualizar un dueno
 *     tags: [Duenos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Dueno actualizado
 *   delete:
 *     summary: Borrar un dueno y sus mascotas y turnos
 *     tags: [Duenos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dueno eliminado
 */

class Router {
    #controlador = null

    constructor() {
        this.#controlador = new Controlador()
    }

    config() {
        const router = express.Router()
        router.get('{/:id}', this.#controlador.obtenerDuenos)
        router.post('/', this.#controlador.guardarDueno)
        router.put('/:id', this.#controlador.actualizarDueno)
        router.delete('/:id', this.#controlador.borrarDueno)
        return router
    }
}
export default Router