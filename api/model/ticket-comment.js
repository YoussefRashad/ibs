const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
   comment: {
      type: String,
      required: true,
   },
   ticket: {
      type: mongoose.Types.ObjectId,
      ref: "tickets",
      required: true,
   },
   owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
      autopopulate: { select: "name photo" },
   },
   createdAt: {
      type: Date,
      default: new Date(),
   },
});

commentSchema.plugin(require("mongoose-autopopulate"));

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
