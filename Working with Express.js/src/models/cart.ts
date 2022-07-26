import fs from 'fs';
import path from 'path';

type Products = {
    id:string,
    qty:number
}

type Carts = {products :Products[], totalPrice :number}

const p = path.join(
  path.dirname(require.main.filename),
  '..',
  'data',
  'cart.json'
);

class Cart {
  static addProduct(id:string, productPrice:string) {
    fs.readFile(p, (err, fileContent) => {
      let cart : Carts = { products:[], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct:Products;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), error => {
        console.log(error);
      });
    });
  }

  static deleteProduct(id:string, productPrice:string) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart:Carts = { ...JSON.parse(fileContent.toString()) };
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
          return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - +productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), error => {
        console.log(error);
      });
    });
  }

  static getCart(cb:(c:Carts | null) => void) {
    fs.readFile(p, (err, fileContent) => {
      const cart:Carts = JSON.parse(fileContent.toString());
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
}

export default Cart;