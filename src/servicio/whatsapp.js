import twilio from 'twilio'
import config from '../config.js'

class WhatsAppService {
    #client = null

    constructor() {
        this.#client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)
    }

    enviarNotificacion = async (mensaje) => {
        try {
            const message = await this.#client.messages.create({
                body: mensaje,
                from: config.TWILIO_WHATSAPP_FROM,
                to: config.TWILIO_WHATSAPP_TO
            })
            console.log(`WhatsApp enviado: ${message.sid}`)
            return message.sid
        } catch (error) {
            console.log(`Error al enviar WhatsApp: ${error.message}`)
        }
    }

    notificarTurnoCreado = async (turno) => {
        const mensaje = `VetApp - Nuevo Turno
Fecha: ${turno.fecha}
Hora: ${turno.hora}
Motivo: ${turno.motivo}
Estado: ${turno.estado}`
        return await this.enviarNotificacion(mensaje)
    }

    notificarTurnoCancelado = async (turno) => {
        const mensaje = `VetApp - Turno Cancelado
Fecha: ${turno.fecha}
Hora: ${turno.hora}
Motivo: ${turno.motivo}`
        return await this.enviarNotificacion(mensaje)
    }
}

export default WhatsAppService