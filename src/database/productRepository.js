import fs from 'fs';

// const products = require('./products.json');
import products from './products.json' assert {type: "json"};

/**
 *
 * @param data
 * @param type
 * @returns {*}
 */
const sortByHandle = (data, type) => {
    return data.sort((a, b) => {
        if (type === 'asc') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
    })
}

/**
 *
 * @param object
 * @param keys
 * @returns {*}
 */
function pick(object, keys) {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}

/**
 * @param limit
 * @param orderBy
 * @returns {{}}
 */
function getList({limit, orderBy}) {
    let productData = products.data;

    if (orderBy) {
        productData = sortByHandle(productData, orderBy);
    }

    if (limit) {
        productData = productData.slice(0, limit);
    }

    return productData;
}

/**
 *
 * @param id
 * @param fields
 * @returns {{}|*}
 */
function getOne({id, fields}) {
    let productData = products.data.find(product => product.id === parseInt(id));

    if (fields) {
        return pick(productData, fields);
    }

    return productData;
}

/**
 *
 * @param id
 */
function removeOne({id}) {
    const updatedProducts = products.data.filter(item => item.id !== parseInt(id));

    return writeData(updatedProducts);
}

/**
 *
 * @param postData
 */
function addProduct({postData}) {
    const currentDate = new Date();
    postData.createdAt = Number(currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    const updatedProducts = [...products.data, postData];

    return writeData(updatedProducts);

}

/**
 *
 * @param postData
 * @param id
 */
function saveProduct({postData, id}) {
    let isUpdate = false;

    if (postData.id !== undefined) {
        delete postData.id;
    }
    if (postData.createdAt !== undefined) {
        delete postData.createdAt;
    }

    const newData = products.data.map(product => {
        if (product.id === parseInt(id)) {
            isUpdate = true;
            return {...product, ...postData}
        }

        return product;
    })

    if (!isUpdate) {
        throw new Error("Id do not exist");
    }

    return writeData(newData);
}

function writeData(newData) {
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: newData
    }));
}

export {getList, getOne, removeOne, addProduct, saveProduct};
