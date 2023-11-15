class APIFeatures {
  //Initialize the class
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // Convert "profileLink" with a string pattern into a regex query
    const parsedQuery = JSON.parse(queryStr);
    if (parsedQuery.profileLink) {
      // If "profileLink" is meant to be a regex, it would come in the form of "regex:pattern"
      const regexPattern = parsedQuery.profileLink.match(/regex:(.*)/);
      if (regexPattern) {
        parsedQuery.profileLink = { $regex: regexPattern[1], $options: 'i' }; // 'i' for case-insensitive
      }
    }

    this.query = this.query.find(parsedQuery);
    return this;
  }

  sort() {
    //Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitField() {
    //Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    //Pagination
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10000;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
