let express = require("express");
let router = express.Router();
module.exports = router;
let RouteModel = require("../models/route.model");
let ServiceModel = require("../models/service.model");
let StopModel = require("../models/stop.model");
let VerifyToken = require("../../auth/VerifyToken");

function calcDistance(res, bus, dir, start, end) {
  let startingDist,
    endingDist,
    flag = false;
  RouteModel.find({
    ServiceNo: bus,
    Direction: dir
  })
    .then(doc => {
      for (let i = 0; i < doc.length; i++) {
        if (doc[i].toObject().BusStopCode === start && !flag) {
          startingDist = doc[i].toObject().Distance;
          flag = true;
        }
        if (doc[i].toObject().BusStopCode === end) {
          endingDist = doc[i].toObject().Distance;
        }
      }
      let distTravelled = +parseFloat(endingDist - startingDist).toFixed(2);
      if (distTravelled < 0) {
        res.send(
          "Invalid distance. Check bus stop codes and direction are entered correctly."
        );
      } else if (isNaN(distTravelled)) {
        res.send(
          "Unable to calculate distance. Check that parameters have been entered correctly."
        );
      } else {
        let ServiceNo = bus,
          Direction = dir,
          StartingBusCode = start,
          StartingBusStop,
          EndingBusCode = end,
          EndingBusStop,
          DistanceTravelledInKm = distTravelled,
          Fare;

        let obj = {
          ServiceNo,
          Direction,
          StartingBusCode,
          StartingBusStop,
          EndingBusCode,
          EndingBusStop,
          DistanceTravelledInKm,
          Fare
        };

        calcFare(res, bus, distTravelled, obj);
      }
    })

    .catch(err => {
      res.status(500).json(err);
    });
}

function calcFare(res, bus, dt, obj) {
  ServiceModel.find({
    ServiceNo: bus
  }).then(doc => {
    let cat = doc[0].toObject().Category;
    if (cat === "FEEDER") {
      fare = 1.5;
    } else if (cat === "EXPRESS") {
      fare =
        dt <= 8.2
          ? 2.3
          : dt <= 11.2
          ? 2.45
          : dt <= 15.2
          ? 2.6
          : dt <= 19.2
          ? 2.75
          : dt <= 23.2
          ? 2.9
          : 3.1;
    } else {
      fare =
        dt <= 3.2
          ? 1.5
          : dt <= 5.2
          ? 1.7
          : dt <= 8.2
          ? 1.9
          : dt <= 11.2
          ? 2.1
          : dt <= 15.2
          ? 2.3
          : dt <= 19.2
          ? 2.4
          : dt <= 23.2
          ? 2.5
          : 2.6;
    }
    obj.Fare = fare;

    res.send(JSON.stringify(obj));
  });
}

//add authentication to /distance route
router.get("/distance", VerifyToken, (req, res) => {
  const { bus, dir, start, end } = req.query;
  if (!bus || !dir || !start || !end) {
    return res.status(400).send("Missing parameter(s). Please try again.");
  }
  calcDistance(res, bus, dir, start, end);
});
