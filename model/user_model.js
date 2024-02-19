// Richard Wilson
// 101370635
// 2/18/2024

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  user_name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
});

module.exports = mongoose.model('User', userSchema);
