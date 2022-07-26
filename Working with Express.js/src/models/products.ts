import fs from "fs";
import path from "path";
import Cart from "./cart";

const p = path.join(
  path.dirname(require.main.filename),
  "..",
  "data",
  "products.json"
);

const getProducts = (cb: (p: Product[]) => void) => {
  let product: Product[] = [];
  fs.readFile(p, (err, data) => {
    if (err) {
      cb([]);
      console.log(err.message);
      return;
    }
    cb(JSON.parse(data.toString()));
  });
};

class Product {
  title: string;
  imageUrl: string;
  price: string;
  description: string;
  id: string;

  constructor(
    id:string,
    title: string,
    imageUrl: string,
    price: string,
    description: string
  ) {
    this.id = id,
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProducts((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), () => {
          console.log("done");
        });
      }
    });
  }

  static fetchProducts(cb: (p: Product[]) => void) {
    getProducts(cb);
  }

  static getProductById(pId: string, cb: (p: Product) => void) {
    getProducts((products) => {
      const product = products.find((prdt) => {
        return prdt.id === pId;
      });
      cb(product);
    });
  }

  static findById(id: string, cb: (product: Product) => void) {
    getProducts((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

  static deleteById(id:string) {
    getProducts(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
}

export default Product;
