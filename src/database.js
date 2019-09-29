let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/distance-api");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
 
db.once('open', () => {
    console.log("Connection successful!"); 
});

module.exports = mongoose;