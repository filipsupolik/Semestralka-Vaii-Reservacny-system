import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes"
import authToken from "./src/middlewares/authMiddleware"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});
