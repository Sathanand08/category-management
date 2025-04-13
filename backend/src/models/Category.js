import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
    itemCount: {
      type: Number,
      required: [true, 'Item count is required'],
      default: 0,
      min: [0, 'Item count cannot be negative'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;