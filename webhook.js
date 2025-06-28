// routes/webhook.js
import express from 'express';
import Review from '../db/models/Review.js';
import scheduleEmail from '../services/email.js';

const router = express.Router();

router.post('/order', async (req, res) => {
  const order = req.body;

  try {
    const { id, contact_email, products } = order;

    // Agendar envio de e-mail em 5 dias
    scheduleEmail({
      to: contact_email,
      orderId: id,
      productIds: products.map(p => p.id)
    });

    res.status(200).send('Webhook recebido com sucesso!');
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).send('Erro interno');
  }
});

export default router;
