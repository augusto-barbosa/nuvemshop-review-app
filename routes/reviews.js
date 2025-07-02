// routes/reviews.js
import express from 'express';
import Review from '../db/models/Review.js';
import { authenticate } from '../middleware/authMiddleware.js'; // 👈 ADICIONADO

const router = express.Router();

// Salvar nova avaliação
router.post('/', async (req, res) => {
  try {
    const { store_id, product_id, name, email, rating, comment } = req.body;

    const review = new Review({
      store_id,
      product_id,
      name,
      email,
      rating,
      comment,
      approved: false
    });

    await review.save();
    res.status(201).send({ message: 'Avaliação enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar avaliação:', error);
    res.status(500).send({ message: 'Erro interno' });
  }
});

// Listar avaliações aprovadas (público)
router.get('/', async (req, res) => {
  try {
    const { product_id } = req.query;

    const reviews = await Review.find({
      product_id,
      approved: true
    }).sort({ created_at: -1 });

    res.send(reviews);
  } catch (error) {
    console.error('Erro ao listar avaliações:', error);
    res.status(500).send({ message: 'Erro interno' });
  }
});

// Widget público
router.get('/widget', async (req, res) => {
  try {
    const { store_id, product_id } = req.query;
    const reviews = await Review.find({
      store_id,
      product_id,
      approved: true
    }).sort({ created_at: -1 });

    res.render('review-widget', { reviews });
  } catch (error) {
    console.error('Erro ao carregar widget:', error);
    res.status(500).send('Erro interno');
  }
});

// ROTA PROTEGIDA: listar todas avaliações da loja logada
router.get('/admin', authenticate, async (req, res) => {
  try {
    const reviews = await Review.find({ store_id: req.store_id });
    res.send(reviews);
  } catch (error) {
    console.error('Erro ao listar avaliações do admin:', error);
    res.status(500).send({ message: 'Erro interno' });
  }
});

export default router;
