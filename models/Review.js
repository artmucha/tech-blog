import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  rating: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rating',
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  game: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game',
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
  },
  updatedAt: { 
    type: Date, 
    default: Date.now, 
  },
},
{
  timestamps: { 
    createdAt: true, 
    updatedAt: true, 
  }
}
);

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;