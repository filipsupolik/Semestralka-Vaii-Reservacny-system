const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const restaurantRouter = require("./routes/restaurantRouter");
const authRouter = require("./routes/authRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/auth", authRouter);
app.use("/restaurant", restaurantRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
