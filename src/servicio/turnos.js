import Turno from "../modelo/Turno.js";
import TurnosFactory from "../modelo/DAO/turnosFactory.js";
import WhatsAppService from "../servicio/whatsapp.js";
import config from "../config.js";
class Servicio {
  #modelo = null;
  #whatsapp = null;
  constructor() {
    this.#modelo = TurnosFactory.get(config.MODO_PERSISTENCIA);
    this.#whatsapp = new WhatsAppService();
  }
  obtenerTurnos = async (id) => {
    if (id) return await this.#modelo.obtenerTurno(id);
    return await this.#modelo.obtenerTurnos();
  };
  guardarTurno = async (datos) => {
    const turno = new Turno(datos);
    turno.validar();
    const turnoGuardado = await this.#modelo.guardarTurno(turno.get());
    await this.#whatsapp.notificarTurnoCreado(turnoGuardado);
    return turnoGuardado;
  };
  actualizarTurno = async (id, datos) => {
    const turnoActualizado = await this.#modelo.actualizarTurno(id, datos);
    if (datos.estado === "cancelado") {
      await this.#whatsapp.notificarTurnoCancelado(turnoActualizado);
    }
    return turnoActualizado;
  };
  borrarTurno = async (id) => {
    return await this.#modelo.borrarTurno(id);
  };
  obtenerTurnosPorMascota = async (mascota_id) => {
    return await this.#modelo.obtenerTurnosPorMascota(mascota_id);
  };
  borrarTurnosPorMascota = async (mascota_id) => {
    return await this.#modelo.borrarTurnosPorMascota(mascota_id);
  };
}
export default Servicio;
