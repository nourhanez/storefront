"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var orders_1 = __importDefault(require("./handlers/orders"));
var users_1 = __importDefault(require("./handlers/users"));
exports.app = express_1["default"]();
var address = "0.0.0.0:3000";
exports.app.use(body_parser_1["default"].json());
exports.app.get('/', function (req, res) {
    res.send('Hello World!');
});
orders_1["default"](exports.app);
users_1["default"](exports.app);
exports.app.listen(3000, function () {
    console.log("starting app on: " + address);
});
