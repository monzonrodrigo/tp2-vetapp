import { expect } from 'chai'
import supertest from 'supertest'
import express from 'express'
import RouterMascotas from '../src/router/mascotas.js'
import RouterDuenos from '../src/router/duenos.js'
import CnxMongoDB from '../src/modelo/DBMongo.js'

const app = express()
app.use(express.json())
app.use('/api/mascotas', new RouterMascotas().config())
app.use('/api/duenos', new RouterDuenos().config())

const request = supertest(app)
let idMascota = null
let idDuenoTest = null
before(async () => {
    await CnxMongoDB.conectar()
    const resDueno = await request.post('/api/duenos')
        .send({ nombre: 'Dueno Test', telefono: '123', email: 'test@test.com' })
    idDuenoTest = resDueno.body._id
})
after(async () => {
    if (idMascota) await request.delete(`/api/mascotas/${idMascota}`)
    if (idDuenoTest) await request.delete(`/api/duenos/${idDuenoTest}`)
})
describe('Mascotas API', () => {
    it('POST /api/mascotas - debe crear una mascota (Caso Feliz)', async () => {
        const res = await request.post('/api/mascotas').send({
            nombre: 'Firulais', especie: 'Perro', dueno_id: idDuenoTest
        })
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property('_id')
        idMascota = res.body._id
    })
    it('GET /api/mascotas - debe retornar lista de mascotas', async () => {
        const res = await request.get('/api/mascotas')
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array')
    })
    it('GET /api/mascotas/:id - debe retornar una mascota por ID', async () => {
        const res = await request.get(`/api/mascotas/${idMascota}`)
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property('_id')
    })
    it('PUT /api/mascotas/:id - debe actualizar una mascota', async () => {
        const res = await request.put(`/api/mascotas/${idMascota}`)
            .send({ nombre: 'Firulais Actualizado' })
        expect(res.status).to.equal(200)
        expect(res.body.nombre).to.equal('Firulais Actualizado')
    })
    it('POST /api/mascotas - debe rechazar si falta especie (Caso No Feliz)', async () => {
        const res = await request.post('/api/mascotas')
            .send({ nombre: 'Michi', dueno_id: idDuenoTest })
        expect(res.status).to.equal(500)
        expect(res.body).to.have.property('error')
    })
    it('POST /api/mascotas - debe rechazar body vacio (Caso No Feliz)', async () => {
        const res = await request.post('/api/mascotas').send({})
        expect(res.status).to.equal(500)
        expect(res.body).to.have.property('error')
    })
    it('DELETE /api/mascotas/:id - debe borrar una mascota', async () => {
        const res = await request.delete(`/api/mascotas/${idMascota}`)
        expect(res.status).to.equal(200)
        idMascota = null
    })
})