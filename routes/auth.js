// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Lista simulada de lojas (em breve puxaremos do banco)
const lojas = [
  {
    store_id: '6420064',
    email: 'loja@exemplo.com',
    password: await bcrypt.hash('senha123', 10)
  }
];

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const loja = lojas.find(l => l.email === email);

  if (!loja) return res.status(401).json({ message: 'Loja não encontrada' });

  const match = await bcrypt.compare(password, loja.password);
  if (!match) return res.status(401).json({ message: 'Senha inválida' });

  const token = jwt.sign({ store_id: loja.store_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token });
});

export default router;
