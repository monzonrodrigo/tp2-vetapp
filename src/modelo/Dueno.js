class Dueno {
  constructor({ nombre, telefono, email }) {
    this.nombre = nombre
    this.telefono = telefono
    this.email = email
  }

  validar() {
    if (!this.nombre || this.nombre.trim() === '') {
      throw new Error('El nombre es requerido')
    }

    if (!this.telefono || this.telefono.trim() === '') {
      throw new Error('El telefono es requerido')
    }

    if (!this.email || !this.email.includes('@')) {
      throw new Error('El email no es valido')
    }
  }

  get() {
    return {
      nombre: this.nombre.trim(),
      telefono: this.telefono.trim(),
      email: this.email.trim().toLowerCase()
    }
  }
}

export default Dueno