const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('imdb.db');

app.use(express.static('public'));


app.get('/peliculas', (req, res) => {
  const termino = req.query.busqueda || '';
  
  db.all(
    `SELECT Title, Year FROM Movie 
     WHERE Title LIKE ? 
     LIMIT 10`,
    [`${termino}%`],
    (err, rows) => {
      res.json(err ? [] : rows);
    }
  );
});

app.listen(8147, () => {
  console.log('Servidor simple listo');
});