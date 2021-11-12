const createError = require("http-errors");
const AccessControl = require("role-acl");
const ac = new AccessControl(require("../config/roles"));

const catchAsyncError = require("../utils/catch-async-errors");

module.exports = (action, resource) =>
   catchAsyncError(async (req, res, next) => {
      const role = req.user.role;

      const permission = await ac.can(role).execute(action).on(resource);

      if (permission.granted) {
         next();
      } else {
         // resource is forbidden for this user/role
         next(
            createError(
               403,
               "You do not have permission to perform this action"
            )
         );
      }
   });
