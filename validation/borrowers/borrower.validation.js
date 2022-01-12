const { borrower } = require('./borrower.schema');

module.exports = {
  addBorrowerValidation: async (req, res, next) => {
    const value = await borrower.validate(req.body);
    if (value.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
