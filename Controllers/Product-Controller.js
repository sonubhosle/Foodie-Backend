const Product_Service = require('../Services/Product-Service');

const createProduct = async (req, res) => {

    try {
 
     const product = await Product_Service.createProduct(req.body);
 
     return res.status(201).send(product);
     
    } catch (error) {
 
     return res.status(500).send({error:error.message});
     
    }
 
 
 
 }

 const createMultipleProduct = async (req, res) => {


    try {
 
     const product = await Product_Service.createMultipleProducts(req.body);
 
     return res.status(201).send({message:"Products Created Successfully"});
     
    } catch (error) {
 
     return res.status(500).send({error:error.message});
     
    }
 
 
 
 }

 const getAllProducts = async (req, res) => {

    try {
 
     const products = await Product_Service.getAllProducts(req.query);
 
     return res.status(201).send(products);
     
    } catch (error) {
 
     return res.status(500).send({error:error.message});
     
    }
 }

 
const deleteProduct = async (req, res) => {


    const productId = req.params.id;

    try {
 
     const product = await Product_Service.deleteProduct(productId);
 
     return res.status(201).send(product);
     
    } catch (error) {
 
     return res.status(500).send({error:error.message});
     
    }
 
 
 
 }


 const updateProduct = async (req, res) => {


    const productId = req.params.id;

    try {
 
     const product = await Product_Service.updateProduct(productId,req.body);
 
     return res.status(201).send(product);
     
    } catch (error) {
 
     return res.status(500).send({error:error.message});
     
    }
 
 
 
 }



 const findProductById = async (req, res) => {


    const productId = req.params.id;

    try {
 
     const product = await Product_Service.findProductById(productId);
 
     return res.status(201).send(product);
     
    } catch (error) {
 
     return res.status(500).send({error:error.message});
     
    }
 
 
 
 }


 const getRelatedProducts = async (req, res) => {
   try {
       const relatedProducts = await Product_Service.getRelatedProducts(req.params.id);
       res.status(200).json(relatedProducts);
   } catch (error) {
       console.error('Error fetching related products:', error);
       res.status(500).json({ message: error.message });
   }
};

 module.exports = {createProduct,getRelatedProducts,createMultipleProduct,getAllProducts,findProductById,updateProduct,deleteProduct};