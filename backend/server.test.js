jest.mock('./db', () => ({
  query: jest.fn()
}))

const db = require('./db')
const cardsRepository = require('./cardsRepository')

beforeEach(() => {
  jest.clearAllMocks()
})

test('deve listar os cards', async () => {
  db.query.mockResolvedValue({
    rows: [
      { id: 1, front: 'O que é HTML?', back: 'Linguagem de marcação para criar páginas web' },
      { id: 2, front: 'O que é CSS?', back: 'Linguagem para estilizar páginas web' }
    ]
  })

  const resultado = await cardsRepository.getCards()

  expect(resultado).toHaveLength(2)
  expect(resultado[0].front).toBe('O que é HTML?')
})

test('deve buscar um card pelo id', async () => {
  db.query.mockResolvedValue({
    rows: [
      { id: 2, front: 'O que é CSS?', back: 'Linguagem para estilizar páginas web' }
    ]
  })

  const resultado = await cardsRepository.getCardById(2)

  expect(resultado.front).toBe('O que é CSS?')
  expect(db.query).toHaveBeenCalledWith('SELECT * FROM cards WHERE id = $1', [2])
})

test('deve retornar undefined quando o card nao existe', async () => {
  db.query.mockResolvedValue({ rows: [] })

  const resultado = await cardsRepository.getCardById(10)

  expect(resultado).toBeUndefined()
})

test('deve adicionar um novo card', async () => {
  db.query.mockResolvedValue({
    rows: [
      { id: 4, front: 'O que é React?', back: 'Biblioteca JavaScript' }
    ]
  })

  const resultado = await cardsRepository.createCard('O que é React?', 'Biblioteca JavaScript')

  expect(resultado.id).toBe(4)
  expect(resultado.front).toBe('O que é React?')
})

test('deve deletar um card', async () => {
  db.query.mockResolvedValue({ rows: [] })

  const resultado = await cardsRepository.deleteCard(1)

  expect(resultado.ok).toBe(true)
  expect(db.query).toHaveBeenCalledWith('DELETE FROM cards WHERE id = $1', [1])
})
