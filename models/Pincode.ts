import mongoose from 'mongoose';

const PincodeSchema = new mongoose.Schema({
  pincode: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  // Additional fields from your CSV
  circlename: String,
  regionname: String,
  divisionname: String,
  officename: String,
  officetype: String,
  delivery: String,
  district: String,
  statename: String
});

export default mongoose.models.Pincode || mongoose.model('Pincode', PincodeSchema);
