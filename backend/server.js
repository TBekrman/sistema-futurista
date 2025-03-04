
// Backend: Node.js com Express
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

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

// Criar usuário (somente admin)
app.post('/admin/cadastrar', async (req, res) => {
  const { nome, sobrenome, usuario, email, perfil, senha } = req.body;
  const hashedSenha = await bcrypt.hash(senha, 10);
  await pool.query('INSERT INTO usuarios (nome, sobrenome, usuario, email, perfil, senha) VALUES ($1, $2, $3, $4, $5, $6)', [nome, sobrenome, usuario, email, perfil, hashedSenha]);
  res.json({ message: 'Usuário cadastrado' });
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
