import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VetApp API',
      version: '1.0.0',
      description: 'API REST para gestion de turnos veterinarios'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor de desarrollo'
      }
    ]
  },
  apis: ['./src/router/*.js']
}

const specs = swaggerJsdoc(options)

export { swaggerUi, specs }