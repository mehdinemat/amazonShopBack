const User = require('../models/user')
const jwt = require('jsonwebtoken')
const shortid = require('shortid'
)
exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    console.log(req.body)
    if (!user) {
      const { firstName, lastName, email, password } = req.body
      const _user = new User({ firstName, lastName, email, password, userName: shortid.generate() })
      const result = await _user.save()

      if (!result) {
        return res.status(500).json({ msg: 'somthing wrong!' })
      }
      const token = jwt.sign({ _id: _user._id, role: _user.role }, process.env.JSONWEBTOKEN, { expiresIn: '1h' })

      return res.status(201).json({ user: result, msg: 'user Added' })

    }

    return res.status(400).json({ msg: 'user registered!' })


  } catch (err) { return res.status(500).json({ msg: err.message }) }
}

exports.signin = async (req, res) => {

  try {

    await User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        if (user.authenticate(req.body.password)) {

          const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JSONWEBTOKEN, { expiresIn: '1h' })

          const { _id, firstName, lastName, role, email, fullName } = user
          res.status(200).json({
            token, user: {
              _id, firstName, lastName, role, email, fullName
            }
          })

        } else {
          return res.status(500).json({ msg: 'password not match!' })
        }
      } else {
        return res.status(500).json({ msg: 'something wrong!' })
      }
    })



  } catch (err) { return res.status(500).json({ msg: err.message }) }


}
exports.signout = async (req, res) => {
  try {
      res.clearCookie('token')
      res.status(200).json({msg:'user signout'})

  } catch (err) { return res.status(400).json({ msg: err.message }) }
}

