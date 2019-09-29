let fs = require("fs");
let mongoose = require("../database");

let RouteSchema = new mongoose.Schema({
    ServiceNo: String,
    Direction: Number,
    Distance: Number,
    SUN_LastBus: Date,
    StopSequence: Number,
    WD_LastBus: Date,
    SAT_LastBus: Date,
    BusStopCode: String,
    Operator: String,
    SAT_FirstBus: Date,
    SUN_FirstBus: Date,
    WD_FirstBus: Date
});

let Route = mongoose.model("Route", RouteSchema);

let routes = JSON.parse(fs.readFileSync("routes.json"));

Route.collection.countDocuments({}, (err, c) => {
    if (c === 0) {
        Route.collection.insertMany(routes, (err, docs) => {
            if (err) {
                return console.error(err);
            } else {
                console.log("Multiple documents inserted to Route Collection.");
            }
        });
    }; 
});

module.exports = Route;

