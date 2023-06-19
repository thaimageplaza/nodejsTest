import fs from 'fs';
import products from './products.json' assert {type: "json"};

function getAll(limit, orderBy) {
    let productData = products.data;

    const limitHandle = (data, limit) => {
        return data.filter((x, i) => {
            if (i <= (limit - 1)) {
                return true
            }
        })
    }

    const sortByHandle = (data, type) => {
        return data.sort((a, b) => {
            if (type === 'asc') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
        })
    }

    if (limit !== undefined) {
        productData = limitHandle(productData, limit);
    }

    if (orderBy !== undefined) {
        productData = sortByHandle(productData, orderBy);
    }

    return productData;
}

function getOne(id, fields) {
    let productData = products.data.find(product => product.id === parseInt(id));

    if (fields !== undefined) {
        const fieldsAr = fields.split(',');
        let newData = {};

        Object.keys(productData).map((key) => {
            if (fieldsAr.includes(key)) {
                newData = {
                    ...newData,
                    [key]: productData[key]
                }
            }
        });


        return newData;
    }

    return productData;
}

function removeOne(id) {
    const updatedProducts = products.data.filter( item => item.id !== parseInt(id));

    return writeData(updatedProducts);
}

function addProduct(postData) {
    const currentDate = new Date();
    postData.createdAt = Number(currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    const updatedProducts = [...products.data, postData];

    return writeData(updatedProducts);

}

function saveProduct(postData, id) {
    let isUpdate = false;

    if (postData.id !== undefined) {
        delete postData.id;
    }
    if (postData.createdAt !== undefined) {
        delete postData.createdAt;
    }

    const newData = products.data.map( product => {
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

export {getAll, getOne, removeOne, addProduct, saveProduct};
