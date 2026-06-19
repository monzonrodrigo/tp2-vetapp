import ServicioMascotas from './mascotas.js'
import ServicioTurnos from './turnos.js'

class Servicio {
    #servicioMascotas = null
    #servicioTurnos = null

    constructor() {
        this.#servicioMascotas = new ServicioMascotas()
        this.#servicioTurnos = new ServicioTurnos()
    }

    generarHistoriaClinica = async (mascota_id) => {
        const mascota = await this.#servicioMascotas.obtenerMascotas(mascota_id)
        if (!mascota || Object.keys(mascota).length === 0)
            throw new Error('Mascota no encontrada')
        const turnos = await this.#servicioTurnos.obtenerTurnosPorMascota(mascota_id)
        let texto = `======================================
`
        texto += `HISTORIA CLINICA - VETERINARIA VETAPP
`
        texto += `======================================
`
        texto += `DATOS DEL PACIENTE:
`
        texto += `- Nombre: ${mascota.nombre}
`
        texto += `- Especie: ${mascota.especie}
`
        texto += `- Raza: ${mascota.raza || 'No especificada'}
`
        texto += `HISTORIAL DE ATENCIONES:
`
        texto += `--------------------------------------
`
        if (turnos.length === 0) {
            texto += `El paciente no registra turnos previos.
`
        } else {
            turnos.forEach(t => {
                texto += `[${t.fecha} | ${t.hora}] - Estado: ${t.estado.toUpperCase()}
`
                texto += `Motivo: ${t.motivo}
`
                texto += `--------------------------------------
`
            })
        }
        texto += `
Generado por el sistema VetApp.`
        const nombreFormateado = mascota.nombre.replace(/\s+/g, '_').toLowerCase()
        return { nombreArchivo: `historia_${nombreFormateado}.txt`, contenidoTxt: texto }
    }
}

export default Servicio