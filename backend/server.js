
// Backend: Node.js com Express
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'sistema',
  password: 'senha',
  port: 5432,
});

const secret = 'segredo_super_secreto';

// Inicializar banco de dados
const initDb = async () => {
  const sql = fs.readFileSync('backend/init_db.sql', 'utf8');
  await pool.query(sql);
  console.log('Banco de dados inicializado.');
};

initDb();

// Login
app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
  if (result.rows.length > 0) {
    const user = result.rows[0];
    const valid = await bcrypt.compare(senha, user.senha);
    if (valid) {
      const token = jwt.sign({ id: user.id, perfil: user.perfil }, secret, { expiresIn: '8h' });
      return res.json({ token });
    }
  }
  res.status(401).json({ message: 'Usuário ou senha incorretos' });
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
