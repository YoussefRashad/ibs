const fetch = require("node-fetch");
const queryString = require("query-string");

const paramsObj = {
   username: process.env.SMS_USERNAME,
   password: process.env.SMS_PASSWORD,
   SMSSender: process.env.SMS_SENDER,
};

module.exports = (receiver, text, lang) => {
   paramsObj.SMSText = text;
   paramsObj.SMSReceiver = receiver;
   paramsObj.SMSLang = lang;

   const paramsString = queryString.stringify(paramsObj);

   return fetch(
      `https://smsvas.vlserv.com/KannelSending/service.asmx/SendSMS?${paramsString}`
   )
      .then((res) => {
         if (res.status == 500) {
            throw "error";
         }
         return res.text();
      })
      .then((body) => {
         return "success";
      })
      .catch((err) => err);
};
