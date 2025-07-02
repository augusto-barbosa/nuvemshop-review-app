// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Store from '../db/models/Store.js';

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const store = await Store.findOne({ email });
    if (!store) return res.status(401).send({ message: 'Loja não encontrada' });

    const isMatch = await bcrypt.compare(password, store.password);
    if (!isMatch) return res.status(401).send({ message: 'Senha incorreta' });

    const token = jwt.sign({ store_id: store.store_id }, JWT_SECRET, { expiresIn: '7d' });

    res.send({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).send({ message: 'Erro interno' });
  }
});

export default router;
