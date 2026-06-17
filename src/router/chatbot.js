import express from 'express'
import ChatbotService from '../servicio/chatbot.js'

class RouterChatbot {
  #chatbot = null

  constructor() {
    this.#chatbot = new ChatbotService()
  }

  config() {
    const router = express.Router()

    router.post('/', async (req, res) => {
      try {
        const mensaje = req.body.Body || ''
        const respuesta = await this.#chatbot.procesarMensaje(mensaje)

        res.set('Content-Type', 'text/xml')
        res.send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${respuesta}</Message>
</Response>`)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    })

    return router
  }
}

export default RouterChatbot