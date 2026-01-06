const cors = require("cors");
const express = require("express");
const connectDB = require("./config/moviesDB");
const bodyParser = require("body-parser");
const initExternalData = require("./services/initExternalData");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(cors());
// ---------------------- CONNECT TO DATABASE ----------------------
connectDB();

// ---------------------- INITIALIZE EXTERNAL DATA ----------------------
initExternalData().catch((err) =>
  console.error("Failed to init external data:", err)
);

// ---------------------- ROUTERS ----------------------
app.use("/api/auth", require("./routers/authRouter")); // login
app.use("/api/create-account", require("./routers/createAccountRouter"));
app.use("/api/movies", require("./routers/moviesRouter"));
app.use("/api/members", require("./routers/membersRouter"));
app.use("/api/subscriptions", require("./routers/subscriptionsRouter"));
app.use("/api/users", require("./routers/usersRouter"));

// ---------------------- ROOT ----------------------
app.get("/", (req, res) => {
  res.send("Cinema Management System Backend");
});

// ---------------------- START SERVER ----------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
