import express from 'express'
import path from 'path'
import cors from 'cors'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../dist/')))

app.get('/validateYoutubeCode', async(req, res) => {
  const { youtubeCode } = req.query
  let isValid = true

  try {

    try {
      await axios.get(`https://img.youtube.com/vi/${youtubeCode}/0.jpg`)
    } catch(e) {
      isValid = false
    }

    res.status(200).json({ isValid })
  } catch(e) {
    console.log(e)
    res.sendStatus(400)
  }


})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})