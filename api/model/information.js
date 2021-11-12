const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
   content: String,
   gallery: [String],
   latitude: String,
   longitude: String,
   address: String,
   contacts: [
      {
         _id: false,
         key: String,
         value: String,
      },
   ],
   ar: {
      content: String,
      address: String,
      contacts: [
         {
            _id: false,
            key: String,
            value: String,
         },
      ],
   },
});

const infoModel = mongoose.model("info", infoSchema);

module.exports = infoModel;
