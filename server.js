require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const screenshot = require('./utils/screenshot');
const middleware = require('./middleware');
const dir = require('./utils/dir');
const http = require('./utils/http');
const url = require('./utils/url');
const verifyApiKey = require('./utils/verifyApiKey');
require('./utils/schedule')

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/' + dir, express.static(dir))

app.post('/', middleware(), async (req, res) => {
  try {
    await verifyApiKey(req.query.api_key)
    const host = req.headers.host
    const filePath = await screenshot(url(req))
    return res.send(`${http()}://${host}/${filePath}`)
  } catch (error) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})