import mongoose, { Document, Schema } from 'mongoose';

export interface IFailedDistanceLog extends Document {
  fromPincode: string;
  toPincode: string;
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  timestamp: Date;
  errorMessage: string;
  errorCode?: string;
  responseData?: any;
  retryCount: number;
  lastAttempt: Date;
}

const FailedDistanceLogSchema = new Schema<IFailedDistanceLog>({
  fromPincode: { type: String, required: true, index: true },
  toPincode: { type: String, required: true, index: true },
  fromLat: { type: Number, required: true },
  fromLng: { type: Number, required: true },
  toLat: { type: Number, required: true },
  toLng: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, index: true },
  errorMessage: { type: String, required: true },
  errorCode: { type: String },
  responseData: { type: Schema.Types.Mixed },
  retryCount: { type: Number, default: 0 },
  lastAttempt: { type: Date, default: Date.now, index: true },
}, {
  timestamps: true,
  collection: 'failed_distance_logs'
});

// Add compound index for faster lookups
FailedDistanceLogSchema.index({ fromPincode: 1, toPincode: 1 });
FailedDistanceLogSchema.index({ lastAttempt: 1, retryCount: 1 });

// Create the model or return existing one to avoid OverwriteModelError
const FailedDistanceLog = mongoose.models.FailedDistanceLog || 
  mongoose.model<IFailedDistanceLog>('FailedDistanceLog', FailedDistanceLogSchema);

export default FailedDistanceLog;
