// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import oauthRoutes from './routes/oauth.js';
import webhookRoutes from './routes/webhook.js';
import reviewsRoutes from './routes/reviews.js';
import authRoutes from './routes/auth.js'; // 👈 ADICIONADO
import connectDB from './db/mongo.js';

dotenv.config();
connectDB();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/oauth', oauthRoutes);
app.use('/webhook', webhookRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/auth', authRoutes); // 👈 ADICIONADO

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
