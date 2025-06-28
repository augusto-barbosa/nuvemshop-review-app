import express from 'express';
import scheduleEmail from '../services/email.js';

const router = express.Router();

router.post('/order-created', async (req, res) => {
  const order = req.body;

  try {
    const { id, contact_email, products } = order;

    scheduleEmail({
      to: contact_email,
      orderId: id,
      productIds: products.map(p => p.id)
    });

    console.log('Webhook recebido: Pedido criado');
    res.status(200).send('Webhook recebido com sucesso!');
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).send('Erro interno');
  }
});

export default router;
