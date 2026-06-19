import express from "express";
import RouterDuenos from "./router/duenos.js";
import RouterMascotas from "./router/mascotas.js";
import RouterTurnos from "./router/turnos.js";
import RouterChatbot from "./router/chatbot.js";
import RouterEstadisticas from "./router/estadisticas.js";
import RouterExportar from "./router/exportar.js";
import { swaggerUi, specs } from "./swagger.js";
class Server {
  #port = null;
  #routerDuenos = null;
  #routerMascotas = null;
  #routerTurnos = null;
  #routerChatbot = null;
  #routerEstadisticas = null;
  #routerExportar = null;
  constructor(port) {
    this.#port = port;
    this.#routerDuenos = new RouterDuenos().config();
    this.#routerMascotas = new RouterMascotas().config();
    this.#routerTurnos = new RouterTurnos().config();
    this.#routerChatbot = new RouterChatbot().config();
    this.#routerEstadisticas = new RouterEstadisticas().config();
    this.#routerExportar = new RouterExportar().config();
  }
  start() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
    app.use("/api/duenos", this.#routerDuenos);
    app.use("/api/mascotas", this.#routerMascotas);
    app.use("/api/turnos", this.#routerTurnos);
    app.use("/api/chatbot", this.#routerChatbot);
    app.use("/api/estadisticas", this.#routerEstadisticas);
    app.use("/api/exportar", this.#routerExportar);
    const port = this.#port;
    const server = app.listen(port, () =>
      console.log(`Servidor VetApp escuchando en http://localhost:${port}`),
    );
    server.on("error", (error) =>
      console.log(`Error en servidor: ${error.message}`),
    );
  }
}
export default Server;
