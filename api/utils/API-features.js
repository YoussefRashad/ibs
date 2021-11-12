class APIFeatures {
   constructor(query, queryParams) {
      this.queryParams = queryParams;
      this.query = query;
   }

   filter() {
      const cloneQueryParams = { ...this.queryParams };
      const excludeQueries = ["q", "page", "sort", "limit", "fields"];

      excludeQueries.forEach((query) => {
         delete cloneQueryParams[query];
      });

      const queryString = JSON.stringify(cloneQueryParams);

      if (this.queryParams.q) {
         this.count = this.query
            .find({
               $text: {
                  $search: `"${this.queryParams.q}"`,
                  $caseSensitive: false,
               },
            })
            .count();
         this.query = this.query.find({
            $text: {
               $search: `"${this.queryParams.q}"`,
               $caseSensitive: false,
            },
         });
      } else {
         this.count = this.query.find(cloneQueryParams).count();
         this.query = this.query.find(cloneQueryParams);
      }

      return this;
   }

   sort() {
      if (this.queryParams.sort) {
         const sortQuery = this.queryParams.sort.split(",").join(" ");
         console.log(this.queryParams.sort, sortQuery);
         this.query = this.query.sort(sortQuery);
      }
      return this;
   }

   fields(fields) {
      if (this.queryParams.fields) {
         const fieldsQuery = this.queryParams.fields.split(",").join(" ");
         this.query = this.query.select(fieldsQuery);
      } else if (fields) {
         const fieldsQuery = fields.split(",").join(" ");
         this.query = this.query.select(fieldsQuery);
      }

      return this;
   }

   page() {
      const page = this.queryParams.page || 0;
      const limit = this.queryParams.limit * 1 || 50;
      const skip = page * limit;

      if (this.queryParams.page) {
         this.query = this.query.skip(skip).limit(limit);
      } else {
         this.query = this.query.limit(limit);
      }
      return this;
   }
}

module.exports = APIFeatures;
