import express from "express";
import { getAddProducts, postAddProducts, getProducts } from "../controller/admin";

const router = express.Router();

router.get("/add-product", getAddProducts);

router.get("/products", getProducts);

router.post("/add-product", postAddProducts);

export { router as adminRouter };
