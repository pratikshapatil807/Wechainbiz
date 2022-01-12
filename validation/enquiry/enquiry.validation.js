const { enquiry } = require('./enquiry.schema');

module.exports = {
  addEnquiryValidation: async (req, res, next) => {
    const value = await enquiry.validate(req.body);
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
