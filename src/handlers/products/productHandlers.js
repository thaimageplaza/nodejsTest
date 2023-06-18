import {getAll, getOne} from './../../database/productRepository.js';

async function getProducts(ctx) {
    try {
        const products = getAll();

        ctx.body = {
            data: products
        }

    } catch (e) {
        ctx.status =404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}
