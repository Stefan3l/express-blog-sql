const express = require("express")
const postsController = require("../controllers/postsController.js")

// Middleware

const validatId = require("../middleware/validatId.js");
const router = express.Router();




router.use('/:id' , validatId)


// INDEX

router.get('/', postsController.index)

// SHOW

router.get('/:id', postsController.show)

// STORE

router.post('/', postsController.store)

// UPDATE

router.put('/:id', postsController.update)

// MODIFY 

router.patch('/:id', postsController.modify)


// DELETE

router.delete('/:id', postsController.destroy)

module.exports = router;