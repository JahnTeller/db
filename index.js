const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");
const situationRouter = require("./routes/situation");
const departmentRouter = require("./routes/department");
const treatmentRouter = require("./routes/treatment");
const diagnoseRouter = require("./routes/diagnose");
const userRouter = require("./routes/user");
const markRouter = require("./routes/mark");
const preRouter = require("./routes/pre");
const connect = require("./config/db");
const http = require("http");

// const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json({ limit: "50mb", strict: false }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
// app.use(cors({ origin: true, credentials: true }));
app.use(cors());
app.use(morgan("common"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
connect();
app.use("/api/situation", situationRouter);
app.use("/api/department", departmentRouter);
app.use("/api/treatment", treatmentRouter);
app.use("/api/diagnose", diagnoseRouter);
app.use("/api/user", userRouter);
app.use("/api/marks", markRouter);
app.use("/api/preliminary", preRouter);
// const httpServer = http.createServer(app);
// httpServer.timeout = 25 * 1000;
// httpServer.keepAliveTimeout = 70 * 1000;
// httpServer.headersTimeout = 120 * 1000;
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
