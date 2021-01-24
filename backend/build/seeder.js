var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/config.js';
var col = colors;
var mong = mongoose;
dotenv.config();
connectDB();
var importData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var delMany, createdUsers, adminUser_1, sampleProducts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                delMany = null;
                return [4 /*yield*/, User.deleteMany(delMany)];
            case 1:
                _a.sent();
                return [4 /*yield*/, Product.deleteMany(delMany)];
            case 2:
                _a.sent();
                return [4 /*yield*/, Order.deleteMany(delMany)];
            case 3:
                _a.sent();
                return [4 /*yield*/, User.insertMany(users)];
            case 4:
                createdUsers = _a.sent();
                adminUser_1 = createdUsers[0]._id;
                sampleProducts = products.map(function (products) {
                    return __assign(__assign({}, products), { user: adminUser_1 });
                });
                return [4 /*yield*/, Product.insertMany(sampleProducts)];
            case 5:
                _a.sent();
                console.log('Data Imported'.green.inverse);
                process.exit();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error(("" + error_1).red.inverse);
                process.exit(1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var destroyData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var delMany, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                delMany = null;
                return [4 /*yield*/, User.deleteMany(delMany)];
            case 1:
                _a.sent();
                return [4 /*yield*/, Product.deleteMany(delMany)];
            case 2:
                _a.sent();
                return [4 /*yield*/, Order.deleteMany(delMany)];
            case 3:
                _a.sent();
                console.log('Data Destroyed'.red.inverse);
                process.exit();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error(("" + error_2).red.inverse);
                process.exit(1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
if (process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}
