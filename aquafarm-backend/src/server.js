require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/fishes",  require("./routes/fish.routes"));
app.use("/api/banners", require("./routes/banner.routes"));
app.use("/api/auth",    require("./routes/auth.routes"));
app.use("/api/enquiries", require("./routes/enquiry.routes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);