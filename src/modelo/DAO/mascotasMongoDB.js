import { ObjectId } from 'mongodb'
import CnxMongoDB from '../DBMongo.js'

class ModeloMascotasMongoDB {
    constructor() { }
    obtenerMascotas = async () => {
        if (!CnxMongoDB.connectionOK) throw new Error('Error de conexion a base de datos')
        return await CnxMongoDB.db.collection('mascotas').find({}).toArray()
    }

    obtenerMascota = async id => {
        if (!CnxMongoDB.connectionOK) throw new Error('Error de conexion a base de datos')
        const mascota = await CnxMongoDB.db.collection('mascotas')
            .findOne({ _id: new ObjectId(id) })
        return mascota || {}
    }

    guardarMascota = async mascota => {
        if (!CnxMongoDB.connectionOK) throw new Error('Error de conexion a base de datos')
        await CnxMongoDB.db.collection('mascotas').insertOne(mascota)
        return mascota
    }

    actualizarMascota = async (id, mascota) => {
        if (!CnxMongoDB.connectionOK) throw new Error('Error de conexion a base de datos')
        await CnxMongoDB.db.collection('mascotas')
            .updateOne({ _id: new ObjectId(id) }, { $set: mascota })
        return await this.obtenerMascota(id)
    }

    borrarMascota = async id => {
        if (!CnxMongoDB.connectionOK) throw new Error('Error de conexion a base de datos')
        const mascota = await this.obtenerMascota(id)
        await CnxMongoDB.db.collection('mascotas')
            .deleteOne({ _id: new ObjectId(id) })
        return mascota
    }

    obtenerMascotasPorDueno = async dueno_id => {
        if (!CnxMongoDB.connectionOK) throw new Error('Error de conexion a base de datos')
        return await CnxMongoDB.db.collection('mascotas')
            .find({ dueno_id }).toArray()
    }

    borrarMascotasPorDueno = async dueno_id => {
        if (!CnxMongoDB.connectionOK) throw new Error('Error de conexion a base de datos')
        await CnxMongoDB.db.collection('mascotas').deleteMany({ dueno_id })
    }
}

export default ModeloMascotasMongoDB