import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  store_id: { type: String, required: true },
  product_id: { type: String, required: true },
  name: String,
  email: String,
  rating: { type: Number, required: true },
  comment: String,
  created_at: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
});

export default mongoose.model('Review', reviewSchema);

