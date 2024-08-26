const Product = require("../Models/Product");

const createProduct = async (reqData) => {

    const product = new Product({
        title: reqData.title,
        brand: reqData.brand,
        price: reqData.price,
        discountedPrice: reqData.discountedPrice,
        discountPersent: reqData.discountPersent,
        category: reqData.category,
        quantity: reqData.quantity,
        image: reqData.image,
        description: reqData.description
    });

    return await product.save();
}

const getAllProducts = async (pageNumber = 1, pageSize = 25) => {
    pageSize = pageSize || 25;
    pageNumber = pageNumber || 1;

    let query = Product.find();

    // Get total count of products
    const totalProducts = await Product.countDocuments(query);

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * pageSize;

    // Update the query to include pagination
    query = query.skip(skip).limit(pageSize);

    // Execute the query to get the products
    const products = await query.exec();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages };
}

const createMultipleProducts = async (products) => {
    for (let product of products) {
        await createProduct(product)
    }
}



const deleteProduct = async (productId) => {

    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);

    return 'Product Deleted Successfully'


}


const updateProduct = async (productId, reqData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            reqData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            throw new Error('Product not found');
        }

        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}



const findProductById = async (id) => {

    const product = await Product.findById(id).populate("category").exec();

    if (!product) {
        throw new Error("Product Not Found", id)
    }

    return product;
}

const getRelatedProducts = async (productId) => {
    try {
        const product = await findProductById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        const relatedProducts = await Product.find({
            category: product.category,
            brand: product.brand,
            _id: { $ne: productId }
        }).exec();

        return relatedProducts;
    } catch (error) {
        console.error('Error fetching related products:', error);
        throw error;
    }
}


module.exports = { createProduct, createMultipleProducts, getAllProducts, findProductById, getRelatedProducts, deleteProduct, updateProduct };