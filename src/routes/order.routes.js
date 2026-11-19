const router = require('express').Router();
const { createOrder, returnOrder } = require('../controllers/order.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, createOrder);
router.patch('/:id/return', verifyToken, returnOrder);

module.exports = router;