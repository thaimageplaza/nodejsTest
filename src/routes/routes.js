import Router from 'koa-router';
import {productInputMiddleware, productInputUpdateMiddleware} from '../middleware/productInputMiddleware.js'
import {getProducts, getProduct, removeProduct, createProduct, updateProduct} from '../handlers/products/productHandlers.js'

// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

// Routes will go here
router.get('/products', getProducts);

router.get('/product/:id', getProduct);

router.post('/products', productInputMiddleware, createProduct);

router.put('/product/:id', productInputUpdateMiddleware, updateProduct);

router.delete('/product/:id', removeProduct);


// module.exports = router;

export default router;
