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
const lite_1 = require("firebase/firestore/lite");
const database_1 = require("../database");
const apiExports = {
    route: "/getuserdata/:userId",
    type: "get",
    execute(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userIdRequested = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
            let reply = {
                status: 404,
                message: "USERID_NOT_FOUND",
                data: {}
            };
            const docReference = (0, lite_1.doc)(database_1.database.mainDatabase, "users", userIdRequested.toString());
            const docReply = yield (0, lite_1.getDoc)(docReference);
            if (!docReply.exists())
                return res.send(reply);
            const data = docReply.data();
            reply = {
                status: 200,
                message: "OK",
                data: {
                    userid: userIdRequested,
                    username: data.username,
                    // TERNARY :on: :top: FOR REFERENCE:
                    //                        true   -   false
                    online: data.isOnline ? "Online" : "Offline"
                }
            };
            return res.send(reply);
        });
    },
};
exports.default = apiExports;
