let express = require("express");
let app = express();
const bodyParser = require("body-parser");
let cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const config = require("./config");
const dotenv = require("dotenv");
dotenv.config();

const users = require("./model/usermodel");
let port = 5005;

mongoose
  .connect(
    "mongodb+srv://test:test55555@cluster0.mu7blo3.mongodb.net/imageupload?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("there is an error", err);
  });

function generateApiKey(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

app.post("/register", (req, res) => {
  users.find({ email: req.body.email }, (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      res.send("Email already Taken");
    } else {
      let hashpassword = bcrypt.hashSync(req.body.password, 8);
      let APIKEY = generateApiKey(req.body.email);
      users.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashpassword,
          phone: req.body.phone,
          apikey: APIKEY,
        },
        (err, data) => {
          if (err) return res.send("Error While Register");
          res.send("Registion Successful");
        }
      );
    }
  });
});

app.post("/login", (req, res) => {
  users.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.send({ auth: false, token: "Error while Logging" });
    if (!user) return res.send({ auth: false, token: "No User Found" });
    else {
      const passIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passIsValid)
        return res.send({ auth: false, token: "Invalid Password" });

      let token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400,
      });
      res.send({ auth: true, token: token });
    }
  });
});

app.get("/userInfo", (req, res) => {
  let token = req.headers["x-access-token"];
  if (!token) res.send({ auth: false, token: "No Token Provided" });

  jwt.verify(token, config.secret, (err, user) => {
    if (err) return res.send({ auth: false, token: "Invalid Token" });
    users.findById(user.id, (err, result) => {
      res.send(result);
    });
  });
});

const cloudinary = require("./utils/cloudinary");
const upload = require("./utils/multer");
const uploadimage = require("./model/uploadmodel");

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    {
      uploadimage.create(
        {
          email: req.body.email,
          avatar: result.secure_url,
          cloudinary_id: result.public_id,
        },
        (err, data) => {
          if (err) throw err;
          res.send(data);
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/images", (req, res) => {
  let email = req.query.email;
  let apikey = req.query.APIKEY;

  users.find({ email }, (err, result) => {
    if (err) throw err;
    let output = { ...result };
    let APIKEY = output[0].apikey;
    let EMAIL = output[0].email;

    if (apikey == APIKEY && email == EMAIL) {
      uploadimage.find((err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } else {
      res.send({
        authentication: "failed",
        response: "register to get the api key",
      });
    }
  });
});

app.get("/uploadedimages/:email", (req, res) => {
  let email = req.params.email;
  uploadimage.find({ email }, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
