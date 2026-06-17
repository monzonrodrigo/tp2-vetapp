class Mascota {
constructor({ nombre, especie, raza, fechaNacimiento, dueno_id }) {
this.nombre = nombre
this.especie = especie
this.raza = raza
this.fechaNacimiento = fechaNacimiento
this.dueno_id = dueno_id
}
validar() {
if (!this.nombre || this.nombre.trim() === '')
throw new Error('El nombre de la mascota es requerido')
if (!this.especie || this.especie.trim() === '')
throw new Error('La especie es requerida')
if (!this.dueno_id)
throw new Error('El ID del dueno es requerido')
}
get() {
return {
nombre: this.nombre.trim(),
especie: this.especie.trim(),
raza: this.raza?.trim() || '',
fechaNacimiento: this.fechaNacimiento || null,
dueno_id: this.dueno_id
}
}
}
export default Mascota