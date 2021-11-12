module.exports = {
   user: {
      grants: [
         {
            resource: [""],
            action: [""],
            attributes: [""],
         },
      ],
   },
   staff: {
      grants: [
         {
            resource: [""],
            action: [""],
            attributes: [""],
         },
      ],
   },
   admin: {
      grants: [
         {
            resource: ["*"],
            action: "*",
            attributes: ["*"],
         },
      ],
   },
   support: {
      grants: [
         {
            resource: ["*"],
            action: "read",
            attributes: ["*"],
         },
         {
            resource: ["tickets", "replies"],
            action: "*",
            attributes: ["*"],
         },
      ],
   },
};
