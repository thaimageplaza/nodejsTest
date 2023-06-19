import yup from 'yup';

async function productInputMiddleware(ctx, next) {
    try {
        const postData = ctx.request.body;
        let schema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            name: yup.string().required(),
            color: yup.string().required(),
            price: yup.number().min(0),
            product: yup.string().required()

        });

        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }
}

async function productInputUpdateMiddleware(ctx, next) {
    try {
        const postData = ctx.request.body;
        let schema = yup.object().shape({
            name: yup.string(),
            color: yup.string(),
            price: yup.number().min(0),
            product: yup.string()
        });

        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }
}

export {productInputMiddleware, productInputUpdateMiddleware};
