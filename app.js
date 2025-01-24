const express = require('express')
const app = express()
const port = 3001
const blogRouter = require('./routers/posts.js')


// Middleware
const routeNotFound = require('./middleware/routeNotFound.js')
const errorsHandler = require('./middleware/errorsHandler.js')

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/posts', blogRouter)

//Middleware che gestisci gli errori
app.use(errorsHandler)

//Middleware che gestisce l'errore 404
app.use(routeNotFound)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})