const asyncWrapper = (fn) => {                  //get by default
  return async (req, res, next) => {            //decide what to do with parameter
    try {
      await fn(req, res, next);
    } catch (error) {
        next(error)                             //next middleware
    }
  };
};

module.exports = asyncWrapper;
