module.exports = (req) => {
  let { url } = req.body
  for (const item in req.body) {
    if (item != 'url') {
      url += `&${item}=${req.body[item]}`
    }
  }
  return url
}