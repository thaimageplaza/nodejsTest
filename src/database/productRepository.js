import fs from 'fs';
import {MongoClient, ServerApiVersion} from 'mongodb';

// const products = require('./products.json');
import products from './products.json' assert {type: "json"};


const mongoUri = "mongodb://172.16.238.10:27017";
const client = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

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
 * @param limit
 * @param orderBy
 * @returns {{}}
 */
async function getList({limit, orderBy}) {
    let productData = [],
        option = [];
    try {
        await client.connect();

        if (orderBy) {
            option.push({
                $sort: { "accommodates": orderBy }
            });
        }
        if (limit) {
            option.push({
                $limit: parseInt(limit)
            });
        }

        const dbo = await client.db('products');
        const productCollection = dbo.collection("products");
        const findResult = await productCollection.aggregate(option);
        for await (const doc of findResult) {
            productData.push(doc);
        }
    } finally {
        await client.close();
    }

    return productData;
}

/**
 *
 * @param id
 * @param fields
 * @returns {{}|*}
 */
async function getOne({id, fields}) {
    let productData = [];
    let options = {
        projection: {
            _id: 0
        }
    }

    if (fields) {
        fields.split(',').map(field => {
            options.projection[field] = 1;
        })
    }

    try {
        await client.connect();
        const dbo = await client.db('products');
        const productCollection = dbo.collection("products");
        const findResult = await productCollection.findOne({id: parseInt(id)}, options)
        productData.push(findResult);
    } finally {
        await client.close();
    }

    return productData;
}

/**
 *
 * @param id
 */
async function removeOne({id}) {
    let result = false;
    try {
        await client.connect();
        const dbo = await client.db('products');
        const productCollection = dbo.collection("products");
        await productCollection.deleteOne({id: parseInt(id)});
    } finally {
        await client.close();
    }
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
