const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const createError = require("http-errors");

const userSchema = mongoose.Schema({
   role: {
      type: String,
      required: true,
      enum: ["admin", "staff", "support", "user"],
      default: "user",
   },
   isNationalID: {
      type: Boolean,
      default: true,
   },
   createdAt: {
      type: Date,
      default: new Date(),
   },
   currentIBSEmployee: {
      type: Boolean,
      default: true,
   },
   isBlocked: {
      type: Boolean,
      default: false,
   },
   identityNumber: {
      type: String,
      unique: true,
      required: true,
   },
   passportNumber: {
      type: String,
      default: null,
      unique: (val) => {
         return val !== null;
      },
   },
   phone: {
      type: String,
      unique: true,
      required: true,
   },
   name: {
      ar: { type: String, default: null },
      en: { type: String, default: null },
   },
   email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      default: null,
   },
   job: {
      ar: {
         type: String,
         default: null,
      },
      en: {
         type: String,
         lowercase: true,
         default: null,
      },
   },
   address: {
      ar: {
         type: String,
         default: null,
      },
      en: {
         type: String,
         default: null,
      },
   },
   gender: {
      ar: {
         type: String,
         default: null,
      },
      en: {
         type: String,
         enum: ["male", "female"],
         default: null,
      },
   },
   birthDate: { type: Date, default: null },
   hiringDate: { type: Date, default: null },
   exitDate: { type: Date, default: null },
   nationality: {
      ar: {
         type: String,
         default: null,
      },
      en: {
         type: String,
         default: null,
      },
   },
   clientEmpNumber: { type: String },
   insuranceNumber: { type: String },
   ibsNumber: {
      type: String,
      unique: true,
      required: true,
      immutable: true,
   },
   company: {
      number: {
         type: String,
         required: true,
      },
      name: {
         ar: {
            type: String,
            default: null,
         },
         en: {
            type: String,
            default: null,
         },
      },
   },
   bank: {
      name: {
         en: {
            type: String,
            default: null,
         },
         ar: {
            type: String,
            default: null,
         },
      },
      account: {
         type: String,
         default: null,
      },
   },
   //
   photo: {
      type: String,
      default: null,
   },
   notificationToken: {
      type: String,
      select: false,
   },
   password: {
      type: String,
      select: false,
      minlength: 8,
   },
   isVerified: {
      type: Boolean,
      default: false,
   },
   isRegistered: {
      type: Boolean,
      default: false,
   },
   changePasswordAt: {
      type: Date,
      select: false,
   },
   registeredAt: {
      type: Date,
   },
   code: {
      type: String,
      select: false,
   },
   codeExpiresIn: {
      type: String,
      select: false,
   },
});

// Document middleware: runs only before save(), create()
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 12);

   return next();
});

userSchema.methods.checkPassword = async function (password) {
   const compareResult = await bcrypt.compare(password, this.password);
   return compareResult;
};

userSchema.methods.generateCode = function () {
   const randomCode = Math.floor(Math.random() * 90000) + 10000;
   this.code = randomCode;
   this.codeExpiresIn = Date.now() + 3 * 60 * 1000;
   return randomCode;
};

// userSchema.index({ "name.en": "text", "name.ar": "text" });

const User = mongoose.model("users", userSchema);

module.exports = User;
