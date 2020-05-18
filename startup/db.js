const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
  try {
    const conn = await mongoose.connect(config.get('db'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
