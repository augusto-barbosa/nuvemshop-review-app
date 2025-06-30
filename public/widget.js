(function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product_id');

  if (!productId) return;

  fetch(`https://nuvemshop-review-app.onrender.com/reviews/${productId}`)
    .then(res => res.json())
    .then(reviews => {
      if (!reviews.length) return;

      const avgRating =
        reviews.reduce((sum, r) => sum + parseInt(r.rating), 0) / reviews.length;

      const container = document.createElement('div');
      container.innerHTML = `
        <div style="font-family: sans-serif;">
          <div style="color: #f39c12; font-size: 20px;">
            ${'★'.repeat(Math.round(avgRating))}${'☆'.repeat(5 - Math.round(avgRating))}
          </div>
          <div style="font-size: 14px;">${reviews.length} avaliações</div>
        </div>
      `;

      document.body.appendChild(container);
    });
})();
