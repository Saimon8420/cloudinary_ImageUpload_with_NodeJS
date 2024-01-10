const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// this line is important to access css file
app.use(express.static('View'));
app.use(cors());

//from utils
const cloudinary = require("./utils/cloudinary");
const upload = require("./utils/multer");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "View/index.html"));
});

app.post("/post", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(
            req.file.path
        );

        res.json(result);

    } catch (error) {
        console.log(error);
    }
})
app.listen(process.env.PORT, () => {
    console.log(`listening to the port ${process.env.PORT} at:http://localhost:${process.env.PORT}/`);
})