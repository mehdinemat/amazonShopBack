const { check, validationResult } = require('express-validator')

exports.validateSignUpRequest = [check('firsName').notEmpty().withMessage('firstName is required'), check('lastName').notEmpty().withMessage('lastname is required'), check('email').isEmail().withMessage('valid message is required'), check('password').isLength({ min: 6 }).withMessage('password must be at least 6 character long')]

exports.isRequestValidate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.array().length > 0) {
    return res.status(400).json({ msg: errors.array()[0].msg })
  }
  next()

}

exports.validateSignInRequires = [check('email').isEmail().withMessage('valid message is requried'), check('password').isLength({ min: 6 }).withMessage('password must be at least 6 character long')]