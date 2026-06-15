import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";
class ModeloTurnosMongoDB {
  constructor() {}
  obtenerTurnos = async () => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexion a base de datos");
    return await CnxMongoDB.db.collection("turnos").find({}).toArray();
  };
  obtenerTurno = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexion a base de datos");
    const turno = await CnxMongoDB.db
      .collection("turnos")
      .findOne({ _id: new ObjectId(id) });
    return turno || {};
  };
  guardarTurno = async (turno) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexion a base de datos");
    await CnxMongoDB.db.collection("turnos").insertOne(turno);
    return turno;
  };
  actualizarTurno = async (id, turno) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexion a base de datos");
    await CnxMongoDB.db
      .collection("turnos")
      .updateOne({ _id: new ObjectId(id) }, { $set: turno });
    return await this.obtenerTurno(id);
  };
  borrarTurno = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexion a base de datos");
    const turno = await this.obtenerTurno(id);
    await CnxMongoDB.db
      .collection("turnos")
      .deleteOne({ _id: new ObjectId(id) });
    return turno;
  };
  obtenerTurnosPorMascota = async (mascota_id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexion a base de datos");
    return await CnxMongoDB.db
      .collection("turnos")
      .find({ mascota_id })
      .toArray();
  };
  borrarTurnosPorMascota = async (mascota_id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexion a base de datos");
    await CnxMongoDB.db.collection("turnos").deleteMany({ mascota_id });
  };
}
export default ModeloTurnosMongoDB;
