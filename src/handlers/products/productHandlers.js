import {getAll, getOne, removeOne, addProduct, saveProduct} from './../../database/productRepository.js';

async function getProducts(ctx) {
    try {
        const {limit, sort} = ctx.query;
        const products = getAll(limit, sort);

        ctx.body = {
            data: products
        }

    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

async function getProduct(ctx) {
    try {
        const {id} = ctx.params;
        const {fields} = ctx.query;
        const products = getOne(id, fields);

        ctx.body = {
            data: products
        }

    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

async function createProduct(ctx) {
    try {
        const postData = ctx.request.body;
        addProduct(postData);

        ctx.status = 201;
        return ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

async function updateProduct(ctx) {
    try {
        const {id} = ctx.params;
        const postData = ctx.request.body;
        saveProduct(postData, id);

        ctx.status = 201;
        return ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

async function removeProduct(ctx) {
    try {
        const {id} = ctx.params;
        removeOne(id);

        ctx.status = 201;
        return ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

export {getProducts, getProduct, removeProduct, createProduct, updateProduct};
