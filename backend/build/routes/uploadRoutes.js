import path from 'path';
import express from 'express';
import multer from 'multer';
var router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
function checkFileType(file, cb) {
    var filetypes = /jpg|jpeg|png/;
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    var mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb('Images only!', null);
    }
}
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
router.post('/', upload.single('image'), function (req, res) {
    res.send("/" + req.file.path);
});
export default router;
