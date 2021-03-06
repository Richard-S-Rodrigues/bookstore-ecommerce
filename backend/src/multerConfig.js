const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, path.resolve(__dirname, "..", "tmp", "uploads"))
		},
		filename: (req, file, callback) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) callback(err);

				const filename = `${hash.toString("hex")}-${file.originalname}`;

				callback(null, filename);
			})
		}
	}),
	limits: {
		fileSize: 2 * 1024 * 1024, // 2 MB
	},
	fileFilter: (req, file, callback) => {
		const allowedMimes = [
			"image/jpeg",
			"image/pjpeg",
			"image/png",
			"image/gif"
		];

		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(new Error("Invalid file type"));
		}
	}
}