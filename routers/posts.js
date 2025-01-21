const express = require('express')
const router = express.Router();
const blogsData = require('../data/blog.js')

// Middleware

const validatId = require('../middleware/validatId.js');

router.use('/:id' , validatId)


// INDEX

router.get('/', (req, res) => {
    res.json(blogsData)
})

// SHOW

router.get('/:id', (req, res) => {

  

    const blog = blogsData.find((elm) => elm.id == req.params.id)

    if(blog) {
        res.json(blog)
    } else {
        res.sendStatus(404)
    }
})

// STORE

router.post('/', (req, res) => {
    res.send('Crea un nuovo elemento')
})

// UPDATE

router.put('/:id', (req, res) => {
    res.send(`modifica interamente il post ${req.params.id}`)
})

// MODIFY 

router.patch('/:id', (req, res) => {
    res.send(`modifica parzialmente il post ${req.params.id}`)
})


// DELETE

router.delete('/:id', (req, res) => {
    res.send(`Cancellazione del post ${req.params.id}`)
})

module.exports = router;