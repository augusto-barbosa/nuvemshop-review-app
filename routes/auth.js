// routes/auth.js
import express from 'express';
import Store from '../db/models/Store.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Rota para login da loja
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const store = await Store.findOne({ email });
    if (!store) return res.status(404).json({ message: 'Loja não encontrada' });

    const isMatch = await bcrypt.compare(password, store.password);
    if (!isMatch) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ store_id: store.store_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno' });
  }
});

export default router;
