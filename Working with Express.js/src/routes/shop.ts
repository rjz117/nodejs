import express from "express";
import { getProducts, getIndex, getCart, getCheckout } from "../controller/shop";

const router = express.Router();

router.get("/", getProducts);

router.get('/products', getIndex);

router.get('/cart', getCart);

router.get('/checkout', getCheckout);

export { router as shopRouter };
