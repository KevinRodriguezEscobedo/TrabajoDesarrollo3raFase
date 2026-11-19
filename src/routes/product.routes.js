const router = require('express').Router();
const { createProduct, getProducts } = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/', getProducts);
router.post('/', verifyToken, createProduct);

module.exports = router;