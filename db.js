const mongoose = require('mongoose');

//DEfine the MongoDB connection URL
const mongoURL="mongodb+srv://Manohar:manohar@cluster0.d7nlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Set up MongoDB connection
mongoose.connect(mongoURL,{
     useNewUrlParser:true,
     useUnifiedTopology:true
})


//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

//Define event listeners for database connection
db.on('connected', ()=>{
    console.log("Connected to MongoDB server")
})

db.on('error', (err)=>{
    console.log("Connected to MongoDB error")
 })

db.on('disconnected', ()=>{
    console.log(" MongoDB Disconnect")
 })

//Export the database connection
module.exports = db






