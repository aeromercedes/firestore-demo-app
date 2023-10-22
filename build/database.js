"use strict";
// Using this so that we can use the database from other files and not just index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const app_1 = require("firebase/app");
const lite_1 = require("firebase/firestore/lite");
const firebase_json_1 = __importDefault(require("./config/firebase.json"));
const FirebaseApp = (0, app_1.initializeApp)(firebase_json_1.default);
const MainDatabase = (0, lite_1.getFirestore)(FirebaseApp);
exports.database = {
    mainCollection: (0, lite_1.collection)(MainDatabase, "users"),
    mainDatabase: MainDatabase
};
