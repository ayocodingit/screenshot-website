import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import screenshot from './helpers/screenshot'
import middleware from './middleware'
import dir from './helpers/dir'
import http from './helpers/http'
import url from './helpers/url'
import verifyApiKey from './helpers/verifyApiKey'
import './helpers/schedule'

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/' + dir, express.static(dir))

app.post('/', middleware(), async (req: any, res: any) => {
  try {
    verifyApiKey(req.query.api_key)
    const host = req.headers.host
    const filePath = await screenshot(url(req))
    return res.send(filePath ? `${http()}://${host}/${filePath}` : null)
  } catch (error: any) {
    return res.status(403).send(error.message)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})