CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  front TEXT NOT NULL,
  back TEXT NOT NULL
);

INSERT INTO cards (front, back)
SELECT 'O que é HTML?', 'Linguagem de marcação para criar páginas web'
WHERE NOT EXISTS (SELECT 1 FROM cards WHERE front = 'O que é HTML?');

INSERT INTO cards (front, back)
SELECT 'O que é CSS?', 'Linguagem para estilizar páginas web'
WHERE NOT EXISTS (SELECT 1 FROM cards WHERE front = 'O que é CSS?');

INSERT INTO cards (front, back)
SELECT 'O que é JavaScript?', 'Linguagem de programação para web'
WHERE NOT EXISTS (SELECT 1 FROM cards WHERE front = 'O que é JavaScript?');
