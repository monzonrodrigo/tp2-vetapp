class Turno {
  constructor({ fecha, hora, motivo, mascota_id, estado }) {
    this.fecha = fecha;
    this.hora = hora;
    this.motivo = motivo;
    this.mascota_id = mascota_id;
    this.estado = estado || "pendiente";
  }
  validar() {
    if (!this.fecha) throw new Error("La fecha es requerida");
    if (!this.hora) throw new Error("La hora es requerida");
    if (!this.motivo || this.motivo.trim() === "")
      throw new Error("El motivo es requerido");
    if (!this.mascota_id) throw new Error("El ID de la mascota es requerido");
    const estadosValidos = ["pendiente", "confirmado", "cancelado"];
    if (!estadosValidos.includes(this.estado))
      throw new Error("Estado invalido");
  }
  get() {
    return {
      fecha: this.fecha,
      hora: this.hora,
      motivo: this.motivo.trim(),
      mascota_id: this.mascota_id,
      estado: this.estado,
    };
  }
}
export default Turno;
