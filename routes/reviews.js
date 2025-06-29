import express from 'express';
import Review from '../db/models/Review.js';

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
      approved: false // avaliações precisam ser aprovadas manualmente
    });

    await review.save();
    res.status(201).send({ message: 'Avaliação enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar avaliação:', error);
    res.status(500).send({ message: 'Erro interno' });
  }
});

// Listar avaliações aprovadas de um produto
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({
      product_id: productId,
      approved: true
    }).sort({ created_at: -1 });

    res.send(reviews);
  } catch (error) {
    console.error('Erro ao listar avaliações:', error);
    res.status(500).send({ message: 'Erro interno' });
  }
});

export default router;
