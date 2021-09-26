const Joi = require('joi')

const schema = Joi.object({
  url: Joi.string().required().uri()
})

const middleware = () => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      return res.status(422).json({ error: message })
    } else {
      next()
    }
  }
}
module.exports = middleware;