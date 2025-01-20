import express from 'express';
import { createCategory, deleteCategory } from '../Controllers/CategoryController.js'; 

const categoryRoutes = express.Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.delete('/:categoryId', deleteCategory);

export default categoryRoutes;
