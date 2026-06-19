import ServicioTurnos from './turnos.js'
import ServicioMascotas from './mascotas.js'

class Servicio {
    #servicioTurnos = null
    #servicioMascotas = null

    constructor() {
        this.#servicioTurnos = new ServicioTurnos()
        this.#servicioMascotas = new ServicioMascotas()
    }

    calcularMetricas = async () => {
        const turnos = await this.#servicioTurnos.obtenerTurnos()
        const mascotas = await this.#servicioMascotas.obtenerMascotas()
        const totalTurnos = turnos.length
        if (totalTurnos === 0)
            return { mensaje: "No hay datos suficientes para calcular metricas" }
        const turnosCancelados = turnos.filter(t => t.estado === 'cancelado').length
        const porcentajeCancelados = ((turnosCancelados / totalTurnos) * 100).toFixed(2)
        const conteoEspecies = {}
        mascotas.forEach(m => {
            conteoEspecies[m.especie] = (conteoEspecies[m.especie] || 0) + 1
        })
        let especiePrincipal = ''
        let maxAtenciones = 0
        for (const [especie, cantidad] of Object.entries(conteoEspecies)) {
            if (cantidad > maxAtenciones) {
                maxAtenciones = cantidad
                especiePrincipal = especie
            }
        }
        return {
            total_turnos_historicos: totalTurnos,
            tasa_cancelacion: `${porcentajeCancelados}%`,
            especie_mas_atendida: especiePrincipal || 'Indeterminada'
        }
    }
}

export default Servicio