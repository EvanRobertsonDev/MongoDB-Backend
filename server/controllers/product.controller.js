import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

//Creates new product
const create = async (req, res) => { 
	const product = new Product(req.body) 
	try {
		await product.save()
		return res.status(200).json({ 
			message: "Successful!"
		})
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err) 
		})
	} 
}

//Finds a product by ID
const productByID = async (req, res, next, id) => { 
	try {
		let product = await Product.findById(id) 
		if (!product)
			return res.status('400').json({ 
				error: "Product not found!"
			})
		req.profile = product 
		next()
	} catch (err) {
		return res.status('400').json({ 
			error: "Could not retrieve product"
		}) 
	}
}

//Reads a product
const read = (req, res) => {
	return res.json(req.profile) 
}

//Lists all products
const list = async (req, res) => { 
	try {
		let products = await Product.find().select('name desciption price quantity category') 
		res.json(products)
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err) 
		})
	} 
}

//Update a product
const update = async (req, res) => { 
	try {
		let product = req.profile
		product = extend(product, req.body) 
		await product.save()
		res.json(product) 
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err) 
		})
	} 
}

//Remove a product
const remove = async (req, res) => { 
	try {
		let product = req.profile
		let deletedProduct = await product.deleteOne() 
		res.json(deletedProduct) 
	} catch (err) {
 		return res.status(400).json({error: errorHandler.getErrorMessage(err) })
	} 
}

//Remove all products
const removeAll = async (req, res) => {
	try {
		let deletedProducts = await Product.deleteMany({}) 
		res.json(deletedProducts) 
	} catch (err) {
 		return res.status(400).json({error: errorHandler.getErrorMessage(err) })
	}
}

//Finds product with keyword in name
const productContainsName = async (req, res) => { 
	try {
		const keyword = req.query.name;
	
		if (keyword) {
		  const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
		  res.json(products);
		} else {
		  const allProducts = await Product.find();
		  res.json(allProducts);
		}
	  } catch (error) {
		return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
	  }
}

export default { create, productByID, read, list, remove, update, removeAll, productContainsName }
