"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInController = exports.signUpController = void 0;
const user_1 = require("../model/user");
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(200).json({ message: "All fields are required" });
        }
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }
        const user = yield user_1.User.create({ username, email, password });
        return res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signUpController = signUpController;
const signInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({ message: "All fields are required" });
        }
        const existingUser = yield user_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(200).json({ message: "User does not exists" });
        }
        if (existingUser.password !== password) {
            return res.status(200).json({ message: "Invalid credentials" });
        }
        const user = yield user_1.User.findOne({ email });
        return res.status(201).json({ message: "User signed in successfully", user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signInController = signInController;
