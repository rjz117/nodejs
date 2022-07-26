import express from "express";
import {
  getAddProducts,
  postAddProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts,
} from "../controller/admin";

const router = express.Router();

router.get("/add-product", getAddProducts);

router.get("/products", getProducts);

router.post("/add-product", postAddProducts);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", postDeleteProduct);

export { router as adminRouter };
