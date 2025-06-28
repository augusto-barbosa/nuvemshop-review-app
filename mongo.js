// db/mongo.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default function connectDB() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB conectado!'))
    .catch(err => console.error('Erro ao conectar no MongoDB:', err));
}
