const express = require("express");
const router = express.Router();

const {
   getAllRoles,
   getRole,
   addRole,
   updateRole,
   deleteRole,
} = require("../controllers/roles");

router.route("/").get(getAllRoles).post(addRole);

router.route("/:id/").get(getRole).patch(updateRole).delete(deleteRole);

module.exports = router;
