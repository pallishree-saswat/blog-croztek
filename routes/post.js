const express = require("express");
const router = express.Router();
const passport = require("passport");
const { upload } = require("../utils/s3");

const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  mostViewedPost,
  relatedPost,
  savePost,
  filterByCategory,
  getAllSavedPostForUser
} = require("../controllers/post");

//isAdmin middleware
const isAdmin = require("../middleware/auth")

//CREATE POST
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "docs", maxCount: 5 },
  ]),
  createPost
);

//GET POST
router.get(
  "/singlePost",
  passport.authenticate("jwt", { session: false }),
  getPost
);

//GET POSTS
router.get("/allPost", passport.authenticate("jwt", { session: false }), getPosts);

//UPDATE POST
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "docs", maxCount: 5 },
  ]),
  updatePost
);

//DELETE POST
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deletePost
);

//mostviewdpost
router.get("/most-viewed", passport.authenticate("jwt", { session: false }), mostViewedPost);

//related posts
router.get("/related-post", passport.authenticate("jwt", { session: false }), relatedPost);

//save posts
router.get("/save-post", passport.authenticate("jwt", { session: false }), savePost);

//filter by catergory posts
router.post("/filterByCategory", passport.authenticate("jwt", { session: false }), filterByCategory);

//get all the saved post for an user 
router.get("/savedpost", passport.authenticate("jwt", { session: false }), getAllSavedPostForUser);

module.exports = router;