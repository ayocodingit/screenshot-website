require('dotenv').config();

const verifySecretKey = async (secret) => {
  if (secret !== process.env.SECRET_KEY) throw Error('Credential is invalid')
}

module.exports = verifySecretKey