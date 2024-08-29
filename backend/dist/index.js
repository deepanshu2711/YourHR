"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("./mongodb");
const user_1 = require("./routes/user");
const app = (0, express_1.default)();
(0, mongodb_1.MongoDb)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use("/api", user_1.userRouter);
app.listen(8080, () => console.log("server started"));
