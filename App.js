const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");

const UsersRoute = require("./routes/Users-route");
const ReservesRoute = require("./routes/Reserve-route");
const HttpError = require("./utils/Http-error");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type, Accept, Authorization "
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
});

app.use("/api/users", UsersRoute);
app.use("/api/reserve", ReservesRoute);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

const PORT = process.env.PORT || 5000;
mongoose.set("useFindAndModify", false);
mongoose
    .connect(process.env.MDB_CONNECT, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((err) => console.log(`${err} did not connect`));
