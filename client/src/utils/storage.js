export function restoreStorage(item) {
   let data = null;

   try {
      const storedData = localStorage.getItem(item);

      if (storedData) {
         data = JSON.parse(storedData);
      }
   } catch (err) {
      // If stored data is not a strigified JSON this might fail,
      // that's why we catch the error
   }

   return data;
}

export function storeStorage(item, data) {
   localStorage.setItem(item, JSON.stringify(data));
}

export function removeStorage(item) {
   localStorage.removeItem(item);
}
