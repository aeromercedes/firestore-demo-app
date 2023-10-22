"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const web_json_1 = __importDefault(require("./config/web.json"));
const WebApp = (0, express_1.default)();
const apiFolder = (0, path_1.join)(__dirname, "./api");
const apiModules = (0, fs_1.readdirSync)(apiFolder);
WebApp.listen(web_json_1.default.port, () => {
    console.log('Started endpoint at port ' + web_json_1.default.port);
});
WebApp.use(express_1.default.json());
apiModules.forEach((modulePath) => {
    const module = require(`${apiFolder}/${modulePath}`).default;
    console.log(module);
    console.log("Assigning", module.route, " to", module.type);
    switch (module.type) {
        case "get":
            WebApp.get(module.route, (req, res) => {
                module.execute(req, res);
            });
        case "post":
            WebApp.post(module.route, (req, res) => {
                module.execute(req, res);
            });
    }
});
