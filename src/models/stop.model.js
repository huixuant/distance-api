let fs = require("fs");
let mongoose = require("../database");

let StopSchema = new mongoose.Schema({
    Latitude: Number,
    BusStopCode: String,
    Description: String,
    Longitude: Number,
    RoadName: String
});

let Stop = mongoose.model("Stop", StopSchema);

let stops = JSON.parse(fs.readFileSync("stops.json"));

Stop.collection.countDocuments({}, (err, c) => {
    if (c === 0) {
        Stop.collection.insertMany(stops, (err, docs) => {
            if (err) {
                return console.error(err);
            } else {
                console.log("Multiple documents inserted to Stop Collection.");
            }
        });
    }; 
});

module.exports = Stop;
