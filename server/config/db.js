const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose 
    .connect('mongodb+srv://admin:wwwwww@cluster0.weppimj.mongodb.net/DSI?retryWrites=true&w=majority&appName=Cluster0' ) 
     .then(()=> console.log('DB okey')) 
     .catch((err)=> console.log('db error' , err))
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;