// routes/reviews.js
import express from 'express';
import Review from '../db/models/Review.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Pegar o caminho absoluto para carregar o HTML do formulário
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/review-form.html'));
});

router.post('/submit', async (req, res) => {
  try {
    const { name, rating, comment, productId, orderId } = req.body;
    const review = new Review({ name, rating, comment, productId, orderId });
    await review.save();
    res.status(200).send('Avaliação salva!');
  } catch (err) {
    console.error('Erro ao salvar avaliação:', err);
    res.status(500).send('Erro ao salvar');
  }
});

router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).send('Erro ao buscar avaliações');
  }
});

export default router;
