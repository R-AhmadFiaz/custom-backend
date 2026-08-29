import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp/");
    },

    filename: function (req, file, cb) {
        // decide the filename
        cb(null, file.originalname) // what user name file store it as it is (bad practice)
    },
});

const upload = multer({
    storage
})