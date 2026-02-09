import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        brand: { type: String, required: true, default: 'Bean and Vanilla' },
        category: { type: String, required: true }, // Rings, Watches, etc.
        description: { type: String, required: true },
        material: { type: String }, // e.g., Sandalwood, Stainless Steel
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;