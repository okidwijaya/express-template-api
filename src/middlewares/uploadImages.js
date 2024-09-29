const multer = require("multer");
const path = require("path");

const maxpicturesize = 5 * 1024 * 1024;
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/pictures");
  },
  filename: (req, file, cb) => {
    const { body } = req;
    const user = body.user_id;
    const title = body.title;
    const index = req.fileIndex || 0;
    const filerename = `${title}-${user}-${index}-${file.originalname}`;
    req.fileIndex = (req.fileIndex || 0) + 1;
    cb(null, filerename);
  },
});

const multerOptions = multer({
  storage,
  fileFilter: (req, file, cb) => {
    req.isPassFilter = true;
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb((req.isPassFilter = false));
    }
  },
  limit: { fileSize: maxpicturesize },
});

const uploadsingle = multerOptions.single("image");
const uploadmultiple = multerOptions.array("image", 3);

const uploadSinglePart = (req, res, next) => {
  uploadsingle(req, res, (err) => {
    if(err){
        if (err && err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ msg: "File size exceeds the limit" });
        } 
        if (err.code === 'WRONG_EXSTENSION') {
            return res.status(400).json({
              errMsg: `Only .png, .jpg and .jpeg format allowed!`,
              err: err.code,
            });
        }
        return res.status(500).json({
            errMsg: `Something went wrong.`,
            err,
        });
    }
    next();
  });
};

const uploadMultiPart = (req, res, next) => {
  uploadmultiple(req, res, (err) => {
    if(err){
        if (err && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ msg: "File size exceeds the limit" });
        } 
        if (err.code === 'WRONG_EXSTENSION') {
            return res.status(400).json({
              errMsg: `Only .png, .jpg and .jpeg format allowed!`,
              err: err.code,
            });
        }
        return res.status(500).json({
            errMsg: `Something went wrong.`,
            err,
        });
    }
    next();
  });
};

module.exports = { uploadSinglePart, uploadMultiPart };
