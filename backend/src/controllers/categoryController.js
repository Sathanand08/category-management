import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, itemCount, imageUrl } = req.body;

  if (!name || itemCount === undefined || !imageUrl) {
    res.status(400);
    throw new Error('Please provide name, itemCount, and imageUrl for the category');
  }

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error(`Category with name '${name}' already exists`);
  }

  const category = await Category.create({
    name,
    itemCount,
    imageUrl,
  });

  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400);
    throw new Error('Invalid category data');
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, itemCount, imageUrl } = req.body;
  const categoryId = req.params.id;

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  if (name && name !== category.name) {
      const existingCategoryWithNewName = await Category.findOne({ name });
      if (existingCategoryWithNewName && existingCategoryWithNewName._id.toString() !== categoryId) {
          res.status(400);
          throw new Error(`Another category with the name '${name}' already exists.`);
      }
  }

  category.name = name || category.name;
  category.itemCount = itemCount !== undefined ? itemCount : category.itemCount;
  category.imageUrl = imageUrl || category.imageUrl;

  const updatedCategory = await category.save();

  res.status(200).json(updatedCategory);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  await category.deleteOne();

  res.status(200).json({ message: 'Category removed successfully', _id: categoryId });
});

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};