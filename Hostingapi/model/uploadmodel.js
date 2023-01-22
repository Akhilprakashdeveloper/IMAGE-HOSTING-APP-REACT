const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ImageUploadSchema = new schema({
  email: String,
  avatar: String,
  cloudinary_id: String,
});

const imageupload = mongoose.model("images", ImageUploadSchema);

module.exports = imageupload;
