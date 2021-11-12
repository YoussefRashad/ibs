const rolesModel = require("../model/roles");
const factory = require("./factory");

exports.getAllRoles = factory.getAll(rolesModel);

exports.getRole = factory.getOne(rolesModel);

exports.addRole = factory.createOne(rolesModel);

exports.updateRole = factory.updateOne(rolesModel);

exports.deleteRole = factory.deleteOne(rolesModel, true);
