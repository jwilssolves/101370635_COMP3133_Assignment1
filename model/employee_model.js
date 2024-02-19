// Richard Wilson
// 101370635
// 2/18/2024

const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);



