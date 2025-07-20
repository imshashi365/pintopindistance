import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  isNews?: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['draft', 'published'], 
      default: 'draft' 
    },
    isNews: { 
      type: Boolean, 
      default: false 
    },
  },
  { 
    timestamps: true 
  }
);

// Create a unique index on slug
blogSchema.index({ slug: 1 }, { unique: true });

// Create a text index for search
blogSchema.index({ 
  title: 'text', 
  content: 'text',
  excerpt: 'text' 
});

// If the model already exists, use that model instead of compiling it again
export default mongoose.models?.Blog || mongoose.model<IBlog>('Blog', blogSchema);
