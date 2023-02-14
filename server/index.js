const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const database = require("./config/database");
const authRouter = require("./routes/auth"); 
const postRouter = require("./routes/post"); 

// dotenv 
dotenv.config();

// express app, cors
const app = express();
app.use(cors());

// json parser
app.use(bodyParser.json({limit:'30mb', extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}));

// routes
app.use("/", authRouter);
app.use("/", postRouter);

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

// database from database.js
database();

// port bağlantısı
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running", PORT);
})