const fs = require("fs");
const path = require("path")
const cloudinary = require("cloudinary").v2;

const uploadFileController = async (req, res) => {
	const { path: filepath } = req.file;
	
	try {		
		if (!filepath) {
			throw new Error("Image file not found!");
		}
		const tmpDirectory = path.join(__dirname, "..", "..", "tmp", "uploads")
	
		cloudinary.uploader.upload(filepath, function (error, result) {
			if (error) {
				console.log("cloudinary uploader error: ", error);
				throw new Error("Error uploading file");
			}

			clearTmpFiles(tmpDirectory);

			return res.status(201).json({
				message: "File uploaded",
				image: {
					filepath: result.secure_url,
					public_id: result.public_id
				}
			})
		})


	} catch(error) {
		clearTmpFiles(tmpDirectory);

		console.log(error);
		return res.status(error.statusCode || 500).json({
			message: "Some error occur"
		});
	}
}

const clearTmpFiles = (dir) => {
	fs.readdir(dir, (err, files) => {
	  if (err) throw err;

	  for (const file of files) {
	    fs.unlink(path.join(dir, file), err => {
	      if (err) throw err;
	    });
	  }
	});
}

module.exports = uploadFileController;