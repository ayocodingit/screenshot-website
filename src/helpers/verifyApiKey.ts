const verifyApiKey = async (api_key: string) => {
  if (api_key !== process.env.API_KEY) throw Error('Api Key is invalid')
}

export default verifyApiKey
