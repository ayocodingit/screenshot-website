import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import screenshot from './utils/screenshot'
import middleware from './middleware'
import dir from './utils/dir'
import http from './utils/http'
import url from './utils/url'
import verifyApiKey from './utils/verifyApiKey'
import './utils/schedule'

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/' + dir, express.static(dir))

app.post('/', middleware(), async (req: any, res: any) => {
  try {
    await verifyApiKey(req.query.api_key)
    const host: string = req.headers.host
    const filePath: string | null = await screenshot(url(req))
    return res.send(filePath ? `${http()}://${host}/${filePath}` : null)
  } catch (error: any) {
    console.log(error.message)
    return res.status(403).send(error.message)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})