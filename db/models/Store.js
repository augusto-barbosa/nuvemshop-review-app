// db/models/Store.js
import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  store_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // hash com bcrypt
});

export default mongoose.model('Store', storeSchema);
