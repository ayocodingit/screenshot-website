require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const screenshot = require('./utils/screenshot');
const verify = require('./utils/verify');
const middleware = require('./middleware');

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', middleware(), async (req, res) => {
  try {
    await verify(req.query.secret)
    const { url, git } = req.body
    const host = req.headers.host
    const filePath = await screenshot(url, git, host)
    return res.json({filePath: filePath})
  } catch (error) {
    console.log(error.message)
    return res.status(403).json({ error: error.message })
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})