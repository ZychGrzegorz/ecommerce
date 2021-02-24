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
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
//@description   Fetch all products
//@route         Get /api/products  /keyword
//@access        Public
var getProducts = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageSize, page, keyword, count, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageSize = 10;
                page = Number(req.query.pageNumber) || 1;
                keyword = req.query.keyword ? {
                    name: { $regex: req.query.keyword,
                        $options: 'i' }
                } : {};
                return [4 /*yield*/, Product.countDocuments(__assign({}, keyword))];
            case 1:
                count = _a.sent();
                return [4 /*yield*/, Product.find(__assign({}, keyword)).limit(pageSize).skip(pageSize * (page - 1))];
            case 2:
                products = _a.sent();
                res.json({ products: products, page: page, pages: Math.ceil(count / pageSize) });
                return [2 /*return*/];
        }
    });
}); });
//@description   Fetch single product
//@route         Get /api/products/:id
//@access        Public
var getProductById = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.findById(req.params.id)];
            case 1:
                product = _a.sent();
                if (product) {
                    res.json(product);
                }
                else {
                    res.status(404);
                    throw new Error('Product not found');
                }
                return [2 /*return*/];
        }
    });
}); });
//@description   Delete a product
//@route         DELETE /api/products/:id
//@access        Private/Admin
var deleteProduct = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.findById(req.params.id)];
            case 1:
                product = _a.sent();
                if (!product) return [3 /*break*/, 3];
                return [4 /*yield*/, product.remove()];
            case 2:
                _a.sent();
                res.json({
                    message: 'Product removed'
                });
                return [3 /*break*/, 4];
            case 3:
                res.status(404);
                throw new Error('Product not found');
            case 4: return [2 /*return*/];
        }
    });
}); });
//@description   Create a product
//@route         POST /api/products
//@access        Private/Admin
var createProduct = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, createdProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product = new Product({
                    name: 'Sample name',
                    price: 0,
                    user: req.user._id,
                    image: '/assets/images/sample.png',
                    imageMin: '/assets/imagesMin/sample.png',
                    brand: 'Sample brand',
                    category: 'Sample category',
                    countInStock: 0,
                    numReviews: 0,
                    description: 'Sample description'
                });
                return [4 /*yield*/, product.save()];
            case 1:
                createdProduct = _a.sent();
                res.status(201).json(createdProduct);
                return [2 /*return*/];
        }
    });
}); });
//@description   Update a product
//@route         PUT /api/products/:id
//@access        Private/Admin
var updateProduct = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, description, image, imageMin, brand, category, countInStock, product, updatedProduct;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, description = _a.description, image = _a.image, imageMin = _a.imageMin, brand = _a.brand, category = _a.category, countInStock = _a.countInStock;
                return [4 /*yield*/, Product.findById(req.params.id)];
            case 1:
                product = _b.sent();
                if (!product) return [3 /*break*/, 3];
                product.name = name;
                product.price = price;
                product.description = description;
                product.image = image;
                product.imageMin = imageMin;
                product.brand = brand;
                product.category = category;
                product.countInStock = countInStock;
                return [4 /*yield*/, product.save()];
            case 2:
                updatedProduct = _b.sent();
                res.json(updatedProduct);
                return [3 /*break*/, 4];
            case 3:
                res.status(404);
                throw new Error('Product not found');
            case 4: return [2 /*return*/];
        }
    });
}); });
//@description   Create new review
//@route         POST /api/products/:id/reviews
//@access        Private
var createProductReview = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rating, comment, product, alreadyReviewed, review;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, rating = _a.rating, comment = _a.comment;
                return [4 /*yield*/, Product.findById(req.params.id)];
            case 1:
                product = _b.sent();
                if (product) {
                    alreadyReviewed = product.reviews.find(function (r) { return r.user.toString() === req.user._id.toString(); });
                    if (alreadyReviewed) {
                        res.status(400);
                        throw new Error('Product already reviewed');
                    }
                }
                else {
                    res.status(404);
                    throw new Error('Product not found');
                }
                review = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment: comment,
                    user: req.user._id
                };
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating = product.reviews.reduce(function (acc, item) { return item.rating + acc; }, 0) / Number(product.reviews.length);
                return [4 /*yield*/, product.save()];
            case 2:
                _b.sent();
                res.status(201).json({ message: 'Review added' });
                return [2 /*return*/];
        }
    });
}); });
//@description   Get top rated products
//@route         GET /api/products/top
//@access        Public
var getTopProducts = asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.find({}).sort({ rating: -1 }).limit(3)];
            case 1:
                products = _a.sent();
                res.json(products);
                return [2 /*return*/];
        }
    });
}); });
export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts };
