import Servicio from '../servicio/turnos.js'
class Controlador {
 #servicio = null
 constructor() {
 this.#servicio = new Servicio()
 }
 obtenerTurnos = async (req, res) => {
 try {
 const { id } = req.params
 const turnos = await this.#servicio.obtenerTurnos(id)
 res.json(turnos)
 } catch (error) {
 res.status(500).json({ url: req.url, method: req.method, error: error.message })
 }
 }
 guardarTurno = async (req, res) => {
 try {
 const datos = req.body
 if (Object.keys(datos).length === 0) throw new Error('El cuerpo esta vacio')
 const turno = await this.#servicio.guardarTurno(datos)
 res.json(turno)
 } catch (error) {
 res.status(500).json({ url: req.url, method: req.method, error: error.message })
 }
 }
 actualizarTurno = async (req, res) => {
 try {
 const { id } = req.params
 const datos = req.body
 const turno = await this.#servicio.actualizarTurno(id, datos)
 res.json(turno)
 } catch (error) {
 res.status(500).json({ url: req.url, method: req.method, error: error.message })
 }
 }
 borrarTurno = async (req, res) => {
 try {
 const { id } = req.params
 const turno = await this.#servicio.borrarTurno(id)
 res.json(turno)
 } catch (error) {
 res.status(500).json({ url: req.url, method: req.method, error: error.message })
 }
 }
 obtenerTurnosPorMascota = async (req, res) => {
 try {
 const { mascota_id } = req.params
 const turnos = await this.#servicio.obtenerTurnosPorMascota(mascota_id)
 res.json(turnos)
 } catch (error) {
 res.status(500).json({ url: req.url, method: req.method, error: error.message })
 }
 }
}
export default Controlador