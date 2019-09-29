let fs = require("fs");
let mongoose = require("../database");

let ServiceSchema = new mongoose.Schema({
    Category: String,
    ServiceNo: String,
    Direction: Number,
    DestinationCode: String,
    AM_Offpeak_Freq: String,
    LoopDesc: String,
    PM_Offpeak_Freq: String,
    Operator: String,
    AM_Peak_Freq: String,
    PM_Peak_Freq: String,
    OriginCode: String,
});

let Service = mongoose.model("Service", ServiceSchema);

let services = JSON.parse(fs.readFileSync("services.json"));

Service.collection.countDocuments({}, (err, c) => {
    if (c === 0) {
        Service.collection.insertMany(services, (err, docs) => {
            if (err) {
                return console.error(err);
            } else {
                console.log("Multiple documents inserted to Service Collection.");
            }
        });
    }; 
});

module.exports = Service;