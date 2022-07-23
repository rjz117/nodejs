import { Request, Response, NextFunction } from "express";

import Product from "../models/products";

type Products = {
  title: string;
};

const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAllProducts((products: Products[]) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

const getIndex = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAllProducts((products: Products[]) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

const getCart = (req: Request, res: Response, next: NextFunction) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

const getCheckout = (req: Request, res: Response, next: NextFunction) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
export { getProducts, getIndex, getCart, getCheckout };
