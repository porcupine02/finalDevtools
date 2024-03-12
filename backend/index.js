const express = require("express");
const cors = require("cors");
const {admin} = require("./config");
const bodyParser = require("body-parser")

const app = express();
app.use(express.json());
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}))


app.use(cors({
    origin: function (origin, callback) {
      // Check if the origin is allowed (e.g., all origins with port 8080)
      if (!origin || origin.endsWith(":8081")) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    methods: ["GET", "POST"], // Allow specified HTTP methods
    // Allow all headers
    allowedHeaders: ['Content-Type', 'Authorization']
  }));




// var admin = require("firebase-admin");

// var serviceAccount = require("./travel-b2e34-firebase-adminsdk-bn6t6-eb904720fe.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// console.log(admin)
const indexRouter = require("./routes/index")
const commentRouter = require("./routes/comment")
const userRouter = require("./routes/user")
const placeRouter = require("./routes/place")
const billRouter = require("./routes/bill")
const addtourRouter = require("./routes/addtour")

app.use(indexRouter.router)
app.use(commentRouter.router)
app.use(userRouter.router)
app.use(placeRouter.router)
app.use(billRouter.router)
app.use(addtourRouter.router)


app.listen(4000, () => console.log("Up & RUnning *4000"));