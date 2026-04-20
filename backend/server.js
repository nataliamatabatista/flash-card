const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let cards = [
  { id: 1, front: 'O que é HTML?', back: 'Linguagem de marcação para criar páginas web' },
  { id: 2, front: 'O que é CSS?', back: 'Linguagem para estilizar páginas web' },
  { id: 3, front: 'O que é JavaScript?', back: 'Linguagem de programação para web' }
]

let nextId = 4

app.get('/cards', (req, res) => {
  res.json(cards)
})

app.post('/cards', (req, res) => {
  const { front, back } = req.body
  const card = { id: nextId, front, back }
  nextId++
  cards.push(card)
  res.json(card)
})

app.delete('/cards/:id', (req, res) => {
  const id = Number(req.params.id)
  cards = cards.filter(c => c.id !== id)
  res.json({ ok: true })
})

app.get('/cards/:id', (req, res) => {
  const id = Number(req.params.id)
  const card = cards.find(c => c.id === id)
  if (!card) {
    return res.status(404).json({ error: 'card nao encontrado' })
  }
  res.json(card)
})

app.listen(3001, () => {
  console.log('servidor rodando na porta 3001')
})
