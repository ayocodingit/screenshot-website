const verifyApiKey = async (api_key) => {
  if (api_key !== process.env.API_KEY) throw Error('Api Key is invalid')
}

module.exports = verifyApiKey
