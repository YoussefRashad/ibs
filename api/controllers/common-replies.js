const commonRepliesModel = require("../model/common-replies");
const factory = require("./factory");

exports.getCommonReplies = factory.getAll(commonRepliesModel);

exports.addReply = factory.createOne(commonRepliesModel);

exports.updateReply = factory.updateOne(commonRepliesModel);

exports.deleteReply = factory.deleteOne(commonRepliesModel, true);
