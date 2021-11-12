const {
   unlink,
   existsSync,
   mkdirSync,
   appendFile,
   writeFileSync,
   readFileSync,
} = require("fs");

exports.filterObj = (obj, type, ...fields) => {
   const newObj = {};
   if (type === "wanted") {
      Object.keys(obj).forEach((el) => {
         if (fields.includes(el)) newObj[el] = obj[el];
      });
   } else {
      Object.keys(obj).forEach((el) => {
         if (!fields.includes(el)) newObj[el] = obj[el];
      });
   }
   return newObj;
};

exports.statusToString = (status) => {
   let formatted;
   switch (status) {
      case 0:
         formatted = "new";
         break;
      case 1:
         formatted = "open";
         break;
      case 2:
         formatted = "pending";
         break;
      case 3:
         formatted = "closed";
         break;
      default:
         formatted = "new";
   }
   return formatted;
};

exports.createInitialDirectories = () => {
   let rootDirs = ["dev/", "production/"];
   let sub = ["user/", "oracle/"];
   if (!existsSync("public/uploads")) {
      mkdirSync("public/uploads");
   }
   if (!existsSync("logs")) {
      mkdirSync("logs");
      rootDirs.forEach((dir) => {
         mkdirSync(`logs/${dir}`);
         sub.forEach((mainDir) => mkdirSync(`logs/${dir}/${mainDir}`));
      });
   }
};

const requestPool = {};

exports.addToPool = (id) => {
   if (!requestPool[id]) {
      console.log("Hello");
   }
};
