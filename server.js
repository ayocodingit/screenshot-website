require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const screenshot = require('./utils/screenshot');
const middleware = require('./middleware');
const dir = require('./utils/dir');
require('./utils/schedule')

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/' + dir, express.static(dir))

app.post('/', middleware(), async (req, res) => {
  try {
    const { url } = req.body
    const host = req.headers.host
    const filePath = await screenshot(url, host)
    return res.send(`https://${host}/${filePath}`)
  } catch (error) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})