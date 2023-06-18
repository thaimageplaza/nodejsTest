import Router from 'koa-router';
import productHandler from '../handlers/products/productHandlers.js'

// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

// Routes will go here
router.get('/products', productHandler.getProducts);

// router.get('/books/:id', (ctx) => {
//     try {
//         const {id} = ctx.params;
//         const getCurrentBook = books.find(book => book.id === parseInt(id));
//         if (getCurrentBook) {
//             return ctx.body = {
//                 data: getCurrentBook
//             }
//         }
//
//         ctx.status = 404;
//         return ctx.body = {
//             status: 'error!',
//             message: 'Book Not Found with that id!'
//         };
//     } catch (e) {
//         return ctx.body = {
//             success: false,
//             error: e.message
//         }
//     }
// });


// module.exports = router;

export default router;
