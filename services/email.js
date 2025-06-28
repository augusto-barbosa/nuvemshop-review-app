// services/email.js
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const FROM_EMAIL = process.env.FROM_EMAIL;
const BASE_URL = process.env.BASE_URL; // Exemplo: https://seuapp.onrender.com

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou outro serviço de e-mail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default function scheduleEmail({ to, orderId, productIds }) {
  setTimeout(() => {
    const url = `${BASE_URL}/reviews/form?orderId=${orderId}&productIds=${productIds.join(',')}`;

    transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject: 'Avalie sua compra!',
      html: `<p>Olá! Que tal avaliar seu produto?</p><p><a href="${url}">Clique aqui para deixar sua avaliação</a></p>`
    }, (error, info) => {
      if (error) {
        console.error('Erro ao enviar e-mail:', error);
      } else {
        console.log('E-mail enviado:', info.response);
      }
    });
  }, 1000 * 60 * 60 * 24 * 5); // espera 5 dias
}
