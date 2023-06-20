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

router.get('/view/products', viewProducts);

router.get('/api/products', getProducts);
router.get('/api/product/:id', getProduct);
router.post('/api/products', productInputMiddleware, createProduct);
router.put('/api/product/:id', productInputUpdateMiddleware, updateProduct);
router.delete('/api/product/:id', removeProduct);

export default router;
