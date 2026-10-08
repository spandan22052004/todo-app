const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set. Add it to your .env file.');
  }

  await mongoose.connect(uri);
  console.log("DB Connected success");
};

module.exports = connectDB;