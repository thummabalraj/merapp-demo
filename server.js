// Import NPM packages
const express = require("express");
const mongoose = require("mongoose");
// morgan is used for http requests logging
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 8080; // Step 1
// Used for resolving cors issues
// const cors = require("cors");


const MONGODB_URI =
  "mongodb+srv://admin-bt:Train$77@cluster0.cd0c6.mongodb.net/<dbname>?retryWrites=true&w=majority";

// Step 2
  // Connect to MONGO DB
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});


// Saving data to mongo DB
// const data = {
//   title: "MERN-Application crash course",
//   body:
//     "This is a series of short videos teaching MERN stack to become full stack developer",
// };

// const newBlogPost = new BlogPost(data); //Instance of the model

// newBlogPost.save((error) => {
//   if (error) {
//     console.log("Ooops...An error occured");
//   } else {
//     console.log("Data has been saved");
//   }
// });

// Initialize the app
const app = express();

const routes = require("./routes/api");

// Data parsing
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// app.use(cors());
app.use(morgan("tiny"));
app.use("/api", routes);

// Step 3
// Build the client project using npm run build
if (process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"));
}

// listen to app the on the defined port
app.listen(PORT, console.log(`Server is running on ${PORT}`));

// Note: As a final step ensure source or client code is not in git. use rm -rf .git to remove it from the git