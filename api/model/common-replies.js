const mongoose = require("mongoose");

const commonRepliesSchema = mongoose.Schema({
   reply: {
      type: String,
      required: true,
   },
});

const commonRepliesModel = mongoose.model("commonReplies", commonRepliesSchema);

module.exports = commonRepliesModel;
