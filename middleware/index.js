const middleware = () => {
  return (req, res, next) => {
    if (!req.body.url) {
      return res.status(422).json({ error: 'url is required' })
    } else {
      next()
    }
  }
}
module.exports = middleware;