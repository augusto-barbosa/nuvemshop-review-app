// db/models/Review.js
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  productId: String,
  orderId: String
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);
