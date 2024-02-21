import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
const create = async (req, res) => { 
const product = new Product(req.body) 
try {
await product.save()
return res.status(200).json({ 
message: "Successfully Created!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const list = async (req, res) => { 
try {
    const name = req.query.name;
      
    let query = {};

    if (name) {
      query = { name: { $regex: new RegExp(name, 'i') } };
    }
  let products = await Product.find(query).select('id name description price quantity category') 
res.json(products)
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const productByID = async (req, res, next, id) => { 
try {
let product = await Product.findById(id).select('id name description price quantity category') 
if (!product)
return res.status('400').json({ 
error: "Product not found"
})
req.profile = product 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve product"
}) 
}
}
const read = (req, res) => {
req.profile.hashed_password = undefined 
req.profile.salt = undefined
return res.json(req.profile) 
}
const update = async (req, res) => { 
try {
let product = req.profile
product = extend(product, req.body) 
product.updated = Date.now() 
await product.save()
product.hashed_password = undefined 
product.salt = undefined
res.json(product) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const remove = async (req, res) => { 
try {
let product = req.profile
let deletedProduct = await product.deleteOne() 
deletedProduct.hashed_password = undefined 
deletedProduct.salt = undefined
res.json(deletedProduct) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const getProductsByName = async (req, res) => {
    try {
      const name = req.query.name; // Assuming you pass the keyword as a query parameter (e.g., /api/products?keyword=kw)
      
      let query = {};
  
      if (name) {
        query = { name: { $regex: new RegExp(name, 'i') } };
      }
  
      const products = await Product.find(query);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const deleteAll = async (req, res) => {
    try {
      const result = await Product.deleteMany({});
      res.status(200).json({ message: 'All products deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

 export default { create, productByID, read, list, remove, update, deleteAll }

