export default obj => {
   Object.keys(obj).forEach(item => {
      if (obj[item] === "") {
         delete obj[item];
      }
   });
};
