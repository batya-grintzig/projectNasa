// const multer=require('multer')
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     },

//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// const imageFilter = function(req, file, cb) {
//     // Accept images only
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         console.log(req.body);
//         req.fileValidationError = 'Only image files are allowed!';
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };
// const uploade=multer({
//      storage,
//      imageFilter

// })
// module.exports=uploade

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const imageFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image.png') {
        cb(null, true);
    }
    cb(null, false);
};
const uploade = multer({

    storage,
    limit: {
        fileSize: 1024 * 1024 * 2
    },
    imageFilter

})
module.exports = uploade