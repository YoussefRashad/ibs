export default (text, limit = 50) => {
   var newText = text;
   if (text && text.length > limit) {
      var newTitle = [];
      text.split(" ").reduce((acc, cur) => {
         if (acc + cur.length < limit) {
            newTitle.push(cur);
         }
         return acc + cur.length;
      }, 0);
      newText = newTitle.join(" ") + "";
   }
   return newText;
};
