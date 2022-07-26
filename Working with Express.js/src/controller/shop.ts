import { Request, Response, NextFunction } from "express";

import Product from "../models/products";
import Cart from '../models/cart';

type Products = {
  title: string;
};

const getProducts = (_req: Request, res: Response, _next: NextFunction) => {
  Product.fetchProducts((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

const getProduct = (req: Request, res: Response, _next: NextFunction) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.getProductById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: "Product Detail",
      path: "/products",
    });
  });
};

const getIndex = (_req: Request, res: Response, _next: NextFunction) => {
  Product.fetchProducts((products: Products[]) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

const getCart = (req: Request, res: Response, _next: NextFunction) => {
  Cart.getCart(cart => {
    Product.fetchProducts(products => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};
const postCart = (req: Request, res: Response, _next: NextFunction) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId,product.price)
  })
  console.log(prodId);
  res.redirect('/');
  
};

const getCheckout = (_req: Request, res: Response, _next: NextFunction) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

const postCartDeleteProduct = (req: Request, res: Response, _next: NextFunction) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

export { getProducts, getProduct, getIndex, getCart, postCart,getCheckout, postCartDeleteProduct };
