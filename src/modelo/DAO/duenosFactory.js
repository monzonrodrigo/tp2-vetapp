import ModeloMongoDB from "./duenosMongoDB.js";

class DuenosFactory {
  static get(tipo) {
    switch (tipo) {
      case "MONGODB":
        console.log("**** Duenos: Persistiendo en MongoDB ****");
        return new ModeloMongoDB();

      default:
        console.log("**** Duenos: Persistiendo en MongoDB por defecto ****");
        return new ModeloMongoDB();
    }
  }
}

export default DuenosFactory;
