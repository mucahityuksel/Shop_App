const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    
        id : Number,
        isFavorite : Boolean,
    
},{ timestamps: true });

const Product = mongoose.model("product",productSchema);
module.exports = Product;