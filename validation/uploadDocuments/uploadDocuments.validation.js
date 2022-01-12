const { uploadDocuments } = require('./uploadDocuments.schema');

module.exports = {
  addUploadDocumentsValidation: async (req, res, next) => {
    const value = await uploadDocuments.validate(req.body);
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
