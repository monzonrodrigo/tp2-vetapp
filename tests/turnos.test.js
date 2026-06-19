import { expect } from "chai";
import supertest from "supertest";
import express from "express";
import RouterTurnos from "../src/router/turnos.js";
import CnxMongoDB from "../src/modelo/DBMongo.js";
const app = express();
app.use(express.json());
app.use("/api/turnos", new RouterTurnos().config());
const request = supertest(app);
let idTurno = null;
before(async () => {
  await CnxMongoDB.conectar();
});
after(async () => {
  if (idTurno) await request.delete(`/api/turnos/${idTurno}`);
});
describe("Turnos API", () => {
  it("POST /api/turnos - debe crear un turno (Caso Feliz)", async () => {
    const res = await request.post("/api/turnos").send({
      fecha: "2026-10-15",
      hora: "15:30",
      motivo: "Vacuna",
      mascota_id: "60d5ecb8b392d7001f111111",
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
    idTurno = res.body._id;
  });
  it("GET /api/turnos - debe retornar lista de turnos", async () => {
    const res = await request.get("/api/turnos");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });
  it("GET /api/turnos/:id - debe retornar un turno por ID", async () => {
    const res = await request.get(`/api/turnos/${idTurno}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
  });
  it("PUT /api/turnos/:id - debe actualizar el estado del turno", async () => {
    const res = await request
      .put(`/api/turnos/${idTurno}`)
      .send({ estado: "confirmado" });
    expect(res.status).to.equal(200);
    expect(res.body.estado).to.equal("confirmado");
  });
  it("POST /api/turnos - debe rechazar si falta mascota_id (Caso No Feliz)", async () => {
    const res = await request.post("/api/turnos").send({
      fecha: "2026-10-15",
      hora: "15:30",
      motivo: "Vacuna",
    });
    expect(res.status).to.equal(500);
    expect(res.body).to.have.property("error");
  });
  it("POST /api/turnos - debe rechazar body vacio (Caso No Feliz)", async () => {
    const res = await request.post("/api/turnos").send({});
    expect(res.status).to.equal(500);
    expect(res.body).to.have.property("error");
  });
  it("DELETE /api/turnos/:id - debe borrar un turno", async () => {
    const res = await request.delete(`/api/turnos/${idTurno}`);
    expect(res.status).to.equal(200);
    idTurno = null;
  });
});
