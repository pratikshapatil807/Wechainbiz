const { loanApplication } = require('./loanApplication.schema');

module.exports = {
  addLoanValidation: async (req, res, next) => {
    const value = await loanApplication.validate(req.body);
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
