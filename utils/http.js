module.exports = () => {
  if (process.env.NODE_ENV === 'production') return 'https'
  else return 'http'
}