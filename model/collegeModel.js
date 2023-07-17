const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  establishedYear: {
    type: Number,
    required: true,
  },
  
},

{ timestamps: true });

const college = mongoose.model('College', collegeSchema);

module.exports = college;
