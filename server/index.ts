import * as express from 'express'
import * as path from 'path'
import { listDirectory, readFile } from './files'
import { search } from './search'


const app = express()
const port = process.env.PORT || 3000
const directory = process.env.NOTES_DIR || '.'

console.log(directory)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/api/files', async (req, res) => {
  try {
    const dir = await listDirectory(directory)
    res.json(dir)
  } catch (err) {
    res.status(500).send('Something broke')
  }
})

app.get('/api/files/*', async (req, res) => {
  const pathToFile = req.params[0]
  try {
    const file = await readFile(path.join(directory, pathToFile))
    res.json(file)
  } catch (err) {
    res.status(404).send('No such file')
  }
})

app.get('/api/search', async (req, res) => {
  try {
    const result = await search(directory, req.query.q.toString())
    res.json(result)
  } catch (err) {
    res.status(500).send('Something happened')
  }
})

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})