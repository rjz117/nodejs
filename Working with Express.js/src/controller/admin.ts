import { Request, Response, NextFunction } from "express";

import Product from '../models/products';

const getAddProducts = (req: Request, res: Response, next: NextFunction) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

const postAddProducts = (req: Request, res: Response, next: NextFunction) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAllProducts((products:Product[]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

export { getAddProducts, postAddProducts, getProducts };