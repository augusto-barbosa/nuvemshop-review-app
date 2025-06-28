// routes/oauth.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

router.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(`https://www.nuvemshop.com.br/apps/oauth/token`, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    });

    const { access_token, user_id } = response.data;
    // Aqui você pode salvar access_token no banco (por loja)

    res.send('Autenticação concluída! Você pode fechar essa aba.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro na autenticação.');
  }
});

export default router;
