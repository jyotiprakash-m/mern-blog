const express = require('express')
const app = express();
const mongoose = require('mongoose')
const postsRoute = require("./routes/posts")
const usersRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const categoriesRoute = require("./routes/categories")

const multer = require('multer')
const path = require("path");
/**
 * Package that used to use .env file
 */
const dotenv = require('dotenv')
dotenv.config()
app.use("/images", express.static(path.join(__dirname, "/images")));

/**
 * Middleware that enable to send JSON object
 */
app.use(express.json())

/**
 * Connect to the database
 */
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => {
    console.log("Database Connected!!")
    app.listen(5000, () => {
        console.log("Backend is running on port 5000")
    })
}).catch(err => console.log(err))

// File Update
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, "demo.png");
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});


app.use("/api/auth", authRoute)

app.use("/api/users", usersRoute)

app.use("/api/posts", postsRoute)

app.use("/api/categories", categoriesRoute)
