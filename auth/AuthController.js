let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
let User = require("../src/models/user.model");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let config = require("../config");
let VerifyToken = require("./VerifyToken");

//register new user
router.post("/register", function(req, res) {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    },
    (err, user) => {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      // create a token
      let token = jwt.sign({ id: user._id }, config.JWT_key, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
});

//retrieve current user
router.get("/me", VerifyToken, (req, res) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err) {
      return res.status(500).send("There was a problem finding the user.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    res.status(200).send(user);
  });
});

//logs in existing user
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).send("Server error.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    if (!req.body.password) {
      return res.status(404).send("Please provide password.");
    }
    //verifies password
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    //create a token
    let token = jwt.sign({ id: user._id }, config.JWT_key, {
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token: token });
  });
});

module.exports = router;
