import Router from 'koa-router';
import {productInputMiddleware, productInputUpdateMiddleware} from '../middleware/productInputMiddleware.js'
import {
    getProducts,
    getProduct,
    removeProduct,
    createProduct,
    updateProduct,
    viewProducts
} from '../handlers/products/productHandlers.js'

const router = new Router();

// Routes views
router.get('/view/products', viewProducts);

// Routes will go here
router.get('/api/products', getProducts);

router.get('/api/product/:id', getProduct);

router.post('/api/products', productInputMiddleware, createProduct);

router.put('/api/product/:id', productInputUpdateMiddleware, updateProduct);

router.delete('/product/:id', removeProduct);


// module.exports = router;

export default router;
