import mongoose from 'mongoose'
//const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
 name: {
 type: String,
 trim: true,
 required: 'Name is required'
 },
 description: {
 type: String,
 trim: true,
 },
 price: {
  type: Number,
  trim: true,
  required: 'Price is required'
 },
 quantity: {
  type: Number,
  trim: true,
  required: 'Quantity is required'
 },
 category: {
  type: String,
  trim: true,
  required: 'Category is required'
 }});

 export default mongoose.model('Product', ProductSchema);