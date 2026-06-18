import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";

class ModeloDuenosMongoDB {
  obtenerDuenos = async () => {
    if (!CnxMongoDB.connectionOK) {
      throw new Error("Error de conexion a base de datos");
    }

    return await CnxMongoDB.db.collection("duenos").find({}).toArray();
  };

  obtenerDueno = async (id) => {
    if (!CnxMongoDB.connectionOK) {
      throw new Error("Error de conexion a base de datos");
    }

    const dueno = await CnxMongoDB.db
      .collection("duenos")
      .findOne({ _id: new ObjectId(id) });

    return dueno || {};
  };

  guardarDueno = async (dueno) => {
    if (!CnxMongoDB.connectionOK) {
      throw new Error("Error de conexion a base de datos");
    }

    await CnxMongoDB.db.collection("duenos").insertOne(dueno);
    return dueno;
  };

  actualizarDueno = async (id, dueno) => {
    if (!CnxMongoDB.connectionOK) {
      throw new Error("Error de conexion a base de datos");
    }

    await CnxMongoDB.db
      .collection("duenos")
      .updateOne({ _id: new ObjectId(id) }, { $set: dueno });

    return await this.obtenerDueno(id);
  };

  borrarDueno = async (id) => {
    if (!CnxMongoDB.connectionOK) {
      throw new Error("Error de conexion a base de datos");
    }

    const dueno = await this.obtenerDueno(id);

    await CnxMongoDB.db
      .collection("duenos")
      .deleteOne({ _id: new ObjectId(id) });

    return dueno;
  };
}

export default ModeloDuenosMongoDB;
