// public/widget.js
(async function () {
  const script = document.currentScript;
  const productId = script.getAttribute('data-product-id');
  const baseUrl = script.getAttribute('data-base-url') || 'https://SEU-APP.onrender.com';

  const container = document.createElement('div');
  container.id = 'nuvemshop-reviews';
  container.innerHTML = '<p>Carregando avaliações...</p>';
  document.body.appendChild(container);

  try {
    const res = await fetch(`${baseUrl}/reviews/product/${productId}`);
    const reviews = await res.json();

    if (!reviews.length) {
      container.innerHTML = '<p>Seja o primeiro a avaliar este produto!</p>';
      return;
    }

    container.innerHTML = `
      <h3>Avaliações:</h3>
      ${reviews.map(r => `
        <div style="border:1px solid #ddd; padding:10px; margin-bottom:10px;">
          <strong>${r.name}</strong> - Nota: ${r.rating}/5<br />
          <p>${r.comment}</p>
        </div>
      `).join('')}
    `;
  } catch (error) {
    container.innerHTML = '<p>Erro ao carregar avaliações.</p>';
    console.error('Erro ao buscar avaliações:', error);
  }
})();
