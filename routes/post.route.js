const express = require('express');
const postController = require('../controllers/post.controller')
const logger = require('../middlewares/logger');
const router = express.Router();

router.get('/get-all', postController.getAll);
router.post('/create', postController.create);
router.delete('/delete/:id', postController.delete);
router.put('/update/:id', postController.update);
router.get('/get-one/:id', postController.getOne);

module.exports = router;