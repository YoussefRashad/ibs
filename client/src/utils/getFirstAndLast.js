export default (data) => {
   const splittedString = data.split(" ");

   if (splittedString.length > 2) {
      const first = splittedString[0];
      const last = splittedString[splittedString.length - 1];
      return first + " " + last;
   }

   return data;
};
