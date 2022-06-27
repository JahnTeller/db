const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const app = express()
const morgan = require("morgan")
const situationRouter = require("./routes/situation")
const departmentRouter = require("./routes/department")
const treatmentRouter = require("./routes/treatment")
const diagnoseRouter = require("./routes/diagnose")
const userRouter = require("./routes/user")
const markRouter = require("./routes/mark")
const connect = require("./config/db")
const PORT = process.env.PORT || 8000
app.use(bodyParser.json({ limit: "50mb", strict: false }))
app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
);
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("common"));
connect()
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*")
  next();
});
app.use("/api/situation", situationRouter)
app.use("/api/department", departmentRouter)
app.use("/api/treatment", treatmentRouter)
app.use("/api/diagnose", diagnoseRouter)
app.use("/api/user", userRouter)
app.use("/api/mark", markRouter)
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})

