import products from './products.json' assert { type: "json" };

function getAll() {
    return products;
}

function getOne(id) {
    return products.find(product => product.id === parseInt(id));
}

export {getAll, getOne};
