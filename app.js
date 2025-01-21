const express = require('express')
const app = express()
const port = 3001
const blogRouter = require('./routers/posts.js')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/posts', blogRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})