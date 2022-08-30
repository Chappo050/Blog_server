const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    post_history: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    password: [{ type: String, required: true }]
  }
);


//Export model
module.exports = mongoose.model('User', UserSchema);
