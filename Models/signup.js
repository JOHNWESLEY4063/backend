const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  college: {
    type: String,
    required: true
  }
});

const Signup = mongoose.model('Signup', signupSchema);
module.exports = Signup;