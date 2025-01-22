const blogsData = require('../data/blog.js')

// INDEX

const index = (req, res) => {
    
    const tag = req.query.tags; 

    if (!tag) {
        return res.json(blogsData)
    }
    const blogTag = blogsData.filter(((elm) => elm.tags.includes(tag)))
                            

    if (blogTag.length === 0) {
        return res.status(404).json({
            error: "Blog not found"
        })
    } else {
        res.json(blogTag)
    }
    
}

// SHOW

const show = (req, res)  => {
    const blog = blogsData.find((elm) => elm.id == req.params.id)

    if(blog) {
        res.json(blog)
    } else {
        res.sendStatus(404)
    }
}

// STORE

const store = (req, res) => {

    blogsData.push()
    res.send('Crea un nuovo elemento')
}

// UPDATE

const update = (req, res) => {
    res.send(`modifica interamente il post ${req.params.id}`)
}

// MODIFY 

const modify = (req, res) => {
    res.send(`modifica parzialmente il post ${req.params.id}`)
}

// DELETE

const destroy = (req, res) => {
    const blogControll = blogsData.find((elm) => elm.id == req.params.id)

    if (!blogControll) {
        return res.status(404).json({
            error: "Blog not found"
        });
    }
    blogsData.splice(blogsData.indexOf(blogControll), 1)
    console.log(blogsData)
    res.sendStatus(204)
}

module.exports = {index, show, store, update, modify, destroy}