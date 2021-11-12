const express = require("express");
const router = express.Router();

const {
   getCommonReplies,
   addReply,
   updateReply,
   deleteReply
} = require("../controllers/common-replies");

const permission = require("../middlewares/permission");

router
   .route("/")
   .get(getCommonReplies)
   .post(permission("create", "replies"), addReply);

router
   .route("/:id")
   .patch(permission("update", "replies"), updateReply)
   .delete(permission("delete", "replies"), deleteReply);

module.exports = router;
