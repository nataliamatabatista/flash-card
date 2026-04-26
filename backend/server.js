const express = require('express')
const cors = require('cors')
const cardsRepository = require('./cardsRepository')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/cards', async (req, res) => {
  const cards = await cardsRepository.getCards()
  res.json(cards)
})

app.post('/cards', async (req, res) => {
  const { front, back } = req.body
  const card = await cardsRepository.createCard(front, back)
  res.json(card)
})

app.delete('/cards/:id', async (req, res) => {
  const id = Number(req.params.id)
  const resultado = await cardsRepository.deleteCard(id)
  res.json(resultado)
})

app.get('/cards/:id', async (req, res) => {
  const id = Number(req.params.id)
  const card = await cardsRepository.getCardById(id)

  if (!card) {
    return res.status(404).json({ error: 'card nao encontrado' })
  }

  res.json(card)
})

app.listen(3001, () => {
  console.log('servidor rodando na porta 3001')
})
