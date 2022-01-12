const { profile } = require('./profile.schema');

module.exports = {
  addProfileValidation: async (req, res, next) => {
    const value = await profile.validate(req.body);
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
