import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import oauthRoutes from './routes/oauth.js';
import webhookRoutes from './routes/webhook.js';
import reviewsRoutes from './routes/reviews.js';
import connectDB from './db/mongo.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/oauth', oauthRoutes);
app.use('/webhook', webhookRoutes);
app.use('/reviews', reviewsRoutes);

// Rota direta para servir o form.html manualmente
app.get('/form.html', (req, res) => {
  res.sendFile(process.cwd() + '/public/form.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
