import Category from "../Models/category.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists." });
    }

    const newCategory = new Category({
      name,
    });

    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully!",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating category",
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    await category.remove();

    res.status(200).json({
      message: "Category deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting category",
      error: error.message,
    });
  }
};
