import express from "express";
import { getProducts, getProduct, getIndex, getCart, postCart, getCheckout, postCartDeleteProduct } from "../controller/shop";

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.post('/cart-delete-item', postCartDeleteProduct);

router.get('/checkout', getCheckout);

export { router as shopRouter };
