const infoModel = require("../model/information");

exports.getInformation = async (req, res) => {
   var lang = req.headers["accept-language"];
   if (!lang) {
      lang = "en";
   }

   const data = await infoModel.aggregate([
      {
         $replaceRoot: {
            newRoot: { $mergeObjects: ["$$ROOT", `$${lang}`] }
         }
      },
      { $project: { ar: 0 } }
   ]);

   res.status(200).json({
      status: "success",
      data: data[0]
   });
};

exports.updateInformation = async (req, res) => {
   var lang = req.headers["accept-language"];
   if (!lang) {
      lang = "en";
   }

   if (lang == "ar") {
      await infoModel.aggregate([
         {
            $set: {
               ar: { $mergeObjects: ["$ar", req.body] }
            }
         },
         { $out: "infos" }
      ]);
   } else {
      await infoModel.findOneAndUpdate({}, req.body, { new: true });
   }

   res.status(200).json({
      status: "success"
   });
};
