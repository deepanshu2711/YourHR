"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", user_1.signUpController);
exports.userRouter.post("/signin", user_1.signInController);
exports.userRouter.post("/upload", user_1.uploadFileController);
exports.userRouter.delete("/delete/:email", user_1.deleteFileController);
