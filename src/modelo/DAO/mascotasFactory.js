import ModeloMongoDB from './mascotasMongoDB.js'

class MascotasFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MONGODB':
                console.log('**** Mascotas: Persistiendo en MongoDB ****')
                return new ModeloMongoDB()
            default:
                console.log('**** Mascotas: Persistiendo en MongoDB (default) ****')
                return new ModeloMongoDB()
        }
    }
}
export default MascotasFactory