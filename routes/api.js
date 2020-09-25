const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogPost");

router.get("/", (req, res) => {
  //   const data = {
  //     username: "Balraj",
  //     age: 43,
  //   };

  BlogPost.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("Error Occured:", error);
    });
});

router.get("/name", (req, res) => {
  const data = {
    username: "Saritha",
    age: 37,
  };
  res.json(data);
});

router.post("/save", (req, res) => {
  console.log("Request:", req.body);
  const data = req.body;
  const newBlogPost = new BlogPost(data);
  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({msg: "Some error occured while saving data:"});
      return;
    } 
    return res.json({msg:"Data saved succesfully"});
  });
});

module.exports = router;
