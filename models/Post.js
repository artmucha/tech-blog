import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lead: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  categories: [{
    id: Number, 
    name: String, 
    slug: String
  }],
  tags: [String],
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  slug: {
    type: String,
    required: true,
  }
},
{
  timestamps: { 
    createdAt: true, 
    updatedAt: true 
  }
}
);

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;