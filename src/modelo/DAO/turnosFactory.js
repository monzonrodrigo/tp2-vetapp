import ModeloMongoDB from './turnosMongoDB.js'
class TurnosFactory {
 static get(tipo) {
 switch (tipo) {
 case 'MONGODB':
 console.log('**** Turnos: Persistiendo en MongoDB ****')
 return new ModeloMongoDB()
 default:
 console.log('**** Turnos: Persistiendo en MongoDB (default) ****')
 return new ModeloMongoDB()
 }
 }
}
export default TurnosFactory