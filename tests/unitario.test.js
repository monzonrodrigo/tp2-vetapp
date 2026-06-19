import { expect } from 'chai'
import Mascota from '../src/modelo/Mascota.js'

describe('Test Unitario - Clase Mascota', () => {
    it('Debe instanciar correctamente la clase y devolver los datos', () => {
        const datosPrueba = {
            nombre: 'Firulais',
            especie: 'Perro',
            raza: 'Caniche',
            dueno_id: '12345'
        }
        const mascota = new Mascota(datosPrueba)
        expect(mascota.get().nombre).to.equal('Firulais')
        expect(mascota.get().especie).to.equal('Perro')
    })
    it('La funcion validar() debe arrojar un error si falta el nombre', () => {
        const datosMalos = {
            nombre: '',
            especie: 'Gato',
            dueno_id: '12345'
        }
        const mascotaMala = new Mascota(datosMalos)
        expect(() => mascotaMala.validar())
            .to.throw('El nombre de la mascota es requerido')
    })
})