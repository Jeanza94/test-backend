import { Router } from "express";
import { getItemById, getItems } from "../controllers/productControllers";

const productRoutes = Router()

productRoutes.get('/items', getItems)
productRoutes.get('/items/:id', getItemById)

export default productRoutes