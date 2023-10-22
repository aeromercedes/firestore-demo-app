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
    route: "/createuser",
    type: "post",
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data); // --> This returns undefined.
            // sanity checks
            if (!data || !(data === null || data === void 0 ? void 0 : data.username) || !(data === null || data === void 0 ? void 0 : data.userid) || !(data === null || data === void 0 ? void 0 : data.online))
                return res.send({ status: 400, message: "BAD_REQUEST" });
            const username = data.username;
            const userid = data.userid;
            const online = data.online;
            const ref = (0, lite_1.doc)(database_1.database.mainDatabase, "users", userid);
            const dbrep = yield (0, lite_1.getDoc)(ref);
            if (dbrep.exists())
                return res.send({ status: 500, message: "RECORD_EXISTS" });
            yield (0, lite_1.setDoc)((0, lite_1.doc)(database_1.database.mainDatabase, "users", userid), {
                username: username,
                userId: userid,
                isOnline: online
            }).then(() => {
                return res.send({ status: 200, message: "OK" });
            });
        });
    },
};
exports.default = apiExports;
