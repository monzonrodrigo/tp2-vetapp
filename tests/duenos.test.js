import { expect } from 'chai'
import supertest from 'supertest'
import express from 'express'
import RouterDuenos from '../src/router/duenos.js'
import CnxMongoDB from '../src/modelo/DBMongo.js'

const app = express()

app.use(express.json())
app.use('/api/duenos', new RouterDuenos().config())

const request = supertest(app)

let idDueno = null

before(async () => {
  await CnxMongoDB.conectar()
})

after(async () => {
  if (idDueno) {
    await request.delete(`/api/duenos/${idDueno}`)
  }
})

describe('Duenos API', () => {
  it('POST /api/duenos - debe crear un dueno', async () => {
    const res = await request.post('/api/duenos').send({
      nombre: 'Test Usuario',
      telefono: '2645000000',
      email: 'test@test.com'
    })

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('_id')
    expect(res.body.nombre).to.equal('Test Usuario')

    idDueno = res.body._id
  })

  it('GET /api/duenos - debe retornar lista de duenos', async () => {
    const res = await request.get('/api/duenos')

    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
  })

  it('GET /api/duenos/:id - debe retornar un dueno por ID', async () => {
    const res = await request.get(`/api/duenos/${idDueno}`)

    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('_id')
  })

  it('PUT /api/duenos/:id - debe actualizar un dueno', async () => {
    const res = await request.put(`/api/duenos/${idDueno}`).send({
      nombre: 'Test Actualizado'
    })

    expect(res.status).to.equal(200)
    expect(res.body.nombre).to.equal('Test Actualizado')
  })

  it('POST /api/duenos - debe rechazar email invalido', async () => {
    const res = await request.post('/api/duenos').send({
      nombre: 'Test',
      telefono: '2645000000',
      email: 'emailinvalido'
    })

    expect(res.status).to.equal(500)
    expect(res.body).to.have.property('error')
  })

  it('POST /api/duenos - debe rechazar body vacio', async () => {
    const res = await request.post('/api/duenos').send({})

    expect(res.status).to.equal(500)
    expect(res.body).to.have.property('error')
  })

  it('DELETE /api/duenos/:id - debe borrar un dueno', async () => {
    const res = await request.delete(`/api/duenos/${idDueno}`)

    expect(res.status).to.equal(200)

    idDueno = null
  })
})