const express = require('express');

const router = express.Router();


const Product_Controller = require('../Controllers/Product-Controller');

router.post('/', Product_Controller.createProduct);
router.post('/creates', Product_Controller.createProduct);
router.put('/:id', Product_Controller.updateProduct);
router.delete('/:id', Product_Controller.deleteProduct);

module.exports = router;