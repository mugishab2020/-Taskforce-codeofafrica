import express from "express";
import {
  createCategory,
  deleteCategory,
} from "../Controllers/CategoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/createCategory", createCategory);
categoryRoutes.delete("/deleteCategory/:categoryId", deleteCategory);
categoryRoutes.get("/", getCategories);

export default categoryRoutes;
