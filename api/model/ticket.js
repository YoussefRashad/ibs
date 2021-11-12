const mongoose = require("mongoose");
const AutoIncrement = require("./autoIncrement");

const { statusToString } = require("../utils/utils-functions");
const { Socket } = require("engine.io");

// Tickets Status
// 0 - New
// 1 - Open
// 2 - Pending
// 3 - Closed
const ticketSchema = new mongoose.Schema(
   {
      owner: {
         type: mongoose.Types.ObjectId,
         ref: "users",
         required: true,
         index: true,
         autopopulate: { select: "name photo" },
      },
      status: {
         type: Number,
         default: 0,
         required: true,
         enum: [0, 1, 2, 3],
         index: true,
      },
      department: {
         type: String,
         default: "support",
         lowercase: true,
      },
      issue: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      createdAt: {
         type: Date,
         default: new Date(),
      },
      closedAt: {
         type: Date,
      },
      subscribers: [
         {
            type: mongoose.Types.ObjectId,
            ref: "users",
            // autopopulate: { select: "name photo" },
         },
      ],
      // comments: [
      //    {
      //       comment: {
      //          type: String,
      //          required: true,
      //       },
      //       owner: {
      //          type: mongoose.Types.ObjectId,
      //          ref: "users",
      //          required: true,
      //          autopopulate: { select: "name photo" },
      //       },
      //       createdAt: {
      //          type: Date,
      //          default: new Date(),
      //       },
      //    },
      // ],
      notes: [
         {
            owner: {
               type: mongoose.Types.ObjectId,
               ref: "users",
               autopopulate: { select: "name photo" },
            },
            createdAt: { type: Date, required: true },
            note: { type: String, required: true },
         },
      ],
   },
   {
      toObject: { virtuals: true },
      toJSON: { virtuals: true },
   }
);

ticketSchema.plugin(AutoIncrement, { inc_field: "uid" });

ticketSchema.plugin(require("mongoose-autopopulate"));

ticketSchema.virtual("statusFormatted").get(function () {
   const status = this.status;
   return statusToString(status);
});

ticketSchema.statics.changeTicketStatus = function (
   ticketId,
   status,
   callback
) {
   return this.model("ticket")
      .findByIdAndUpdate(
         ticketId,
         { status },
         {
            new: true,
            runValidators: true,
         }
      )
      .exec(callback);
};

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;
