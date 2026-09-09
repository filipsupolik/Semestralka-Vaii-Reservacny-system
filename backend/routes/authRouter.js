const { Router } = require("router");

const authRouter = Router();

authRouter.get("/login", login);
