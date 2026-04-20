import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cards, setCards] = useState([])
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [flipped, setFlipped] = useState({})

  useEffect(() => {
    fetch('http://localhost:3001/cards')
      .then(r => r.json())
      .then(data => setCards(data))
  }, [])

  function addCard(e) {
    e.preventDefault()
    fetch('http://localhost:3001/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ front, back })
    })
      .then(r => r.json())
      .then(card => {
        setCards([...cards, card])
        setFront('')
        setBack('')
      })
  }

  function deleteCard(id) {
    fetch('http://localhost:3001/cards/' + id, { method: 'DELETE' })
    setCards(cards.filter(c => c.id !== id))
  }

  function flipCard(id) {
    setFlipped({ ...flipped, [id]: !flipped[id] })
  }

  return (
    <div className="app">
      <h1>Flash Cards</h1>

      <form onSubmit={addCard}>
        <input
          placeholder="Pergunta"
          value={front}
          onChange={e => setFront(e.target.value)}
        />
        <input
          placeholder="Resposta"
          value={back}
          onChange={e => setBack(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="cards">
        {cards.map(card => (
          <div key={card.id} className="card" onClick={() => flipCard(card.id)}>
            <p>{flipped[card.id] ? card.back : card.front}</p>
            <button onClick={e => { e.stopPropagation(); deleteCard(card.id) }}>deletar</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
