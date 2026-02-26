const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// SENHA DO ADMIN (Render vai permitir alterar depois se quiser)
const ADMIN_PASSWORD = "Sindicato23";

app.use(bodyParser.json());
app.use(express.static("public"));

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS confirmacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      municipio TEXT,
      telefone TEXT,
      presenca TEXT,
      observacoes TEXT,
      data TEXT
    )
  `);
});

app.post("/confirmar", (req, res) => {
  const { nome, municipio, telefone, presenca, observacoes } = req.body;

  db.run(
    `INSERT INTO confirmacoes 
    (nome, municipio, telefone, presenca, observacoes, data)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, municipio, telefone, presenca, observacoes, new Date()],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Erro ao salvar" });
      }
      res.json({ success: true });
    }
  );
});

app.post("/login", (req, res) => {
  const { senha } = req.body;
  if (senha === ADMIN_PASSWORD) {
    res.json({ autorizado: true });
  } else {
    res.status(401).json({ autorizado: false });
  }
});

app.get("/lista", (req, res) => {
  db.all("SELECT * FROM confirmacoes ORDER BY data DESC", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar dados" });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
