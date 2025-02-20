// DATABASE
const connection = require("../data/db");

// FAKE DATABASE
const blogsData = require("../data/blog.js");

// INDEX

const index = (req, res) => {
  const sql = `SELECT * FROM posts`;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
};

// SHOW

const show = (req, res) => {
  const blogSql = `SELECT *
        FROM posts
        WHERE id = ?`;

  const tagsSql = ` SELECT  tags.label
        FROM tags
        JOIN post_tag ON post_tag.tag_id = tags.id
        JOIN posts ON post_tag.post_id = posts.id
        WHERE post_tag.post_id = ?`;

  const id = req.params.id;

  connection.query(blogSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    const blog = results[0];

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    connection.query(tagsSql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      console.log(results);
      blog.tags = results;
      res.json(blog);
    });
  });
};

// STORE

const store = (req, res) => {
  const newId = blogsData[blogsData.length - 1].id + 1;
  const newBlog = {
    id: newId,
    name: req.body.name,
    contenuto: req.body.contenuto,
    immagine: req.body.immagine,
    tags: req.body.tags,
  };

  blogsData.push(newBlog);
  res.status(201).json(newBlog);
};

// UPDATE

const update = (req, res) => {
  const blog = blogsData.find((elm) => elm.id == req.params.id);

  if (!blog) {
    return res.sendStatus(404).json({
      error: "Blog not found",
    });
  }

  blog.name = req.body.name;
  blog.contenuto = req.body.contenuto;
  blog.immagine = req.body.immagine;
  blog.tags = req.body.tags;

  res.json(blog);
};

// MODIFY

const modify = (req, res) => {
  let blog = blogsData.find((elm) => elm.id == req.params.id);

  if (!blog) {
    return res.sendStatus(404).json({
      error: "Blog not found",
    });
  }

  blog.name = req.body.name || blog.name;
  blog.contenuto = req.body.contenuto || blog.contenuto;
  blog.immagine = req.body.immagine || blog.immagine;
  blog.tags = req.body.tags || blog.tags;

  res.json(blog);
};

// DELETE

const destroy = (req, res) => {
  const sql = `DELETE
    FROM posts
    WHERE id = ?`;

  const id = req.params.id;

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.sendStatus(204);
  });
};

module.exports = { index, show, store, update, modify, destroy };
