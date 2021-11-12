const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
   role: {
      type: String,
      required: true,
      unique: true
   },
   grants: [
      {
         _id: false,
         resource: [String],
         action: [String]
      }
   ]
});

const roleModel = mongoose.model("roles", roleSchema);

module.exports = roleModel;
