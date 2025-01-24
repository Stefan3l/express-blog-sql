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
    
        const newId = blogsData[blogsData.length - 1].id +1;
        const newBlog = {
            id: newId,
            name: req.body.name,
            contenuto:  req.body.contenuto,
            immagine: req.body.immagine,
            tags: req.body.tags,
        }

        blogsData.push(newBlog)
       res.status(201).json(newBlog)
}

// UPDATE

const update = (req, res) => {
    const blog = blogsData.find((elm) => elm.id == req.params.id)

    if(!blog) {
     return   res.sendStatus(404).json({
        error: "Blog not found"
        });
    }
    
        blog.name = req.body.name;      
        blog.contenuto = req.body.contenuto;
        blog.immagine = req.body.immagine;
        blog.tags = req.body.tags;

        res.json(blog)
    
};

// MODIFY 

const modify = (req, res) => {
    let blog = blogsData.find((elm) => elm.id == req.params.id)

    if(!blog) {
     return   res.sendStatus(404).json({
        error: "Blog not found"
        });
    }

    blog.name = req.body.name || blog.name
    blog.contenuto = req.body.contenuto || blog.contenuto
    blog.immagine = req.body.immagine || blog.immagine
    blog.tags = req.body.tags || blog.tags
      

    res.json(blog)
}

// DELETE

const destroy = (req, res) => {
    const blogDelete = blogsData.find((elm) => elm.id == req.params.id)

    if (!blogDelete) {
        return res.status(404).json({
            error: "Blog not found"
        });
    }
    blogsData.splice(blogsData.indexOf(blogDelete), 1)
    console.log(blogsData)
    res.sendStatus(204)
}

module.exports = {index, show, store, update, modify, destroy}