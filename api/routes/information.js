const express = require("express");
const router = express.Router();

const { roles } = require("../middlewares/auth");

const {
   getInformation,
   updateInformation,
} = require("../controllers/information");

const permission = require("../middlewares/permission");

router
   .route("/")
   .get(permission("read", "information"), getInformation)
   .patch(permission("update", "information"), updateInformation);

module.exports = router;
