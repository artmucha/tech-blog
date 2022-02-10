import mongoose from 'mongoose';

import Password from 'services/password';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
},
{
  toJSON :{
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  }
});

UserSchema.pre('save', async function(done) {
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
