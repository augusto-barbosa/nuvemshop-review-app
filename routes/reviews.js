// Widget público: avaliações aprovadas por loja e produto
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

export default router;
