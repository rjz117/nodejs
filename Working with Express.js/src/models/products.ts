import fs from "fs";
import path from "path";
import { PassThrough } from "stream";

let products: Product[] = [];

const getProducts = (cb: (p: Product[]) => void) => {
  let product: Product[] = [];
  const p = path.join(
    path.dirname(require.main.filename),
    "..",
    "data",
    "products.json"
  );
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
  constructor(t: string) {
    this.title = t;
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      "..",
      "data",
      "products.json"
    );
    fs.readFile(p, (err, data) => {
      if (!err) {
        PassThrough;
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), () => {
        console.log("done");
      });
    });
  }

  static fetchAllProducts(cb: (p: Product[]) => void) {
    let product: Product[] = [];
    const p = path.join(
      path.dirname(require.main.filename),
      "..",
      "data",
      "products.json"
    );
    fs.readFile(p, (err, data) => {
      if (err) {
        cb([]);
        console.log(err.message);

        return;
      }
      cb(JSON.parse(data.toString()));
    });
  }
}

export default Product;
