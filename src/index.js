let express = require("express");
let app = express();
let distanceRoute = require("./routes/distance");
let authController = require("../auth/AuthController");

app.use(authController);
app.use(distanceRoute);

//Handler for Error 404 - Resource Not Found
app.use((req, res, next) => {
  res.status(404).send("Error 404");
});

//Handler for Error 500
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).send("Error 500");
});

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}.`));
