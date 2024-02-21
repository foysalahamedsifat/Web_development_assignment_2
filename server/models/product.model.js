//const mongoose = require('mongoose');
import mongoose from 'mongoose'
       const ProductSchema = new mongoose.Schema({
       name: {
         type: String,
         trim: true,
         required: 'Name is required'
         },
         description: {
             type: String,
              trim: true,
            required: 'Description is required'
            },
            price: {
            type: Number,
            required: 'Price is required',
            default: 0
            },
            quantity: {
              type: Number,
              required: 'Quantity is required',
              default: 0
              },
              category: {
            type: String,
            required: 'Category is required'
            }
        });      
       
      export default mongoose.model('Product', ProductSchema);


