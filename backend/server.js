const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const restaurantRouter = require("./src/routes/restaurantRouter");
const authRouter = require("./src/routes/authRouter");
const categoryRouter = require("./src/routes/categoryRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRouter);
app.use("/restaurant", restaurantRouter);
app.use("/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
