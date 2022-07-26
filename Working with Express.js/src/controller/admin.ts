import { Request, Response, NextFunction } from "express";

import Product from "../models/products";

const getAddProducts = (_req: Request, res: Response, _next: NextFunction) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    edditing: false,
    activeAddProduct: true,
  });
};

const postAddProducts = (req: Request, res: Response, _next: NextFunction) => {
  const { id, title, imageUrl, price, description } = req.body;
  const product = new Product(id, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

const getEditProduct = (req: Request, res: Response, _next: NextFunction) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      product: product,
      edditing: editMode,
    });
  });
};

const postEditProduct = (req: Request, res: Response, _next: NextFunction) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

const postDeleteProduct = (req: Request, res: Response, _next: NextFunction) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};

const getProducts = (_req: Request, res: Response, _next: NextFunction) => {
  Product.fetchProducts((products: Product[]) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};


export { 
  getAddProducts,
  postAddProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts,
};
