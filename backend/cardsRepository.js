const db = require('./db')

async function getCards() {
  const resultado = await db.query('SELECT * FROM cards ORDER BY id')
  return resultado.rows
}

async function getCardById(id) {
  const resultado = await db.query('SELECT * FROM cards WHERE id = $1', [id])
  return resultado.rows[0]
}

async function createCard(front, back) {
  const resultado = await db.query(
    'INSERT INTO cards (front, back) VALUES ($1, $2) RETURNING *',
    [front, back]
  )

  return resultado.rows[0]
}

async function deleteCard(id) {
  await db.query('DELETE FROM cards WHERE id = $1', [id])
  return { ok: true }
}

module.exports = {
  getCards,
  getCardById,
  createCard,
  deleteCard
}
