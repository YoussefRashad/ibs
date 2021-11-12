const createError = require("http-errors");
const catchAsyncErrors = require("../utils/catch-async-errors");
const APIFeatures = require("../utils/API-features");

exports.getAll = (Model, popOptions, query) =>
   catchAsyncErrors(async (req, res, next) => {
      const features = new APIFeatures(Model, { ...query, ...req.query })
         .filter()
         .fields()
         .sort()
         .page();

      const count = await features.count;
      const doc = await features.query.populate(popOptions);

      res.status(200).json({
         status: "success",
         results: count,
         limit: doc.length,
         data: doc,
      });
   });

exports.getOne = (Model, popOptions, fields) =>
   catchAsyncErrors(async (req, res, next) => {
      let query = Model.findById(req.params.id).select(fields);
      if (popOptions) query = query.populate(popOptions);
      const doc = await query;

      if (!doc) {
         return next(createError(404, "No document found with that ID"));
      }

      res.status(200).json({
         status: "success",
         data: doc,
      });
   });

exports.updateOne = (Model) =>
   catchAsyncErrors(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });

      if (!doc) {
         return next(createError(404, "No document found with that ID"));
      }

      res.status(200).json({
         status: "success",
         data: doc,
      });
   });

exports.deleteOne = (Model, ever) =>
   catchAsyncErrors(async (req, res, next) => {
      var doc;
      if (ever) {
         doc = await Model.findById(req.params.id).remove();
      } else {
         doc = await Model.findByIdAndUpdate(req.params.id, {
            isBlocked: true,
         });
      }

      if (!doc) {
         return next(createError(404, "No document found with that ID"));
      }

      res.status(204).json({
         status: "success",
         data: null,
      });
   });

exports.createOne = (Model) =>
   catchAsyncErrors(async (req, res, next) => {
      const doc = await Model.create(req.body);

      res.status(201).json({
         status: "success",
         data: doc,
      });
   });
