const Joi = require('joi')

const schema = Joi.object().keys({
  git: Joi.string().required().valid('gitlab', 'github'),
  url: Joi.string().required().url()
});

const middleware = () => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
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