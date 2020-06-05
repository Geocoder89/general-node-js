const fs = require("fs");
const path = require("path");

// heloer function to fix the path logic
const cartPath = path.join(
  path.dirname(process.mainModule.filename),
  "database",
  "cart.json"
);

// logic for the cart Model
module.exports = class Cart {
  static addProduct(id,productPrice) {
    //    fetch the previous cart
    fs.readFile(cartPath, (err, fileContent) => {
        // we initialize a cart object which has products and totalPrice as keys with them having values of being an empty array and 0 for starters
      let cart = {
        products: [],
        totalPrice: 0,
      };
    //   if there is no error the data is converted to a string and the file content is stored
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyse the cart => find existing product

      /**
       * if there is an existing product we first seek to find the product where the id is equal to the id of the products present
       */
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct;
      // add new product

    //   if existing,add a new product to the existing array and increase the quantity by 1
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products]
        cart.products[existingProductIndex]= updatedProduct
      } else {
        // if not existing,you add this new product to the existing array
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products,updatedProduct]
      }
    //   in either cases you increase the total price
      cart.totalPrice = cart.totalPrice = cart.totalPrice + +productPrice;

    //   we then convert thhe stringified data back t JSON
      fs.writeFile(cartPath,JSON.stringify(cart),err=> console.log(err))

    });

    
  }

  static deleteProduct(id,productPrice) {
    fs.readFile(cartPath,(err,fileContent) => {
      if(err) {
        return;
      }

      const updatedCart = {...JSON.parse(fileContent)}

      const product = updatedCart.products.find(prod => prod.id === id);

      if(!product) {
        return;
      }
      const productQty = product.qty
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice* productQty;

      fs.writeFile(cartPath,JSON.stringify(updatedCart),err=>{
        console.log(err)
      })

    });
  }

  static getCart(cb) {
    fs.readFile(cartPath,(err,fileContent)=> {
      const cart = JSON.parse(fileContent)

      if(err) {
        cb(null)
      } else{
        cb(cart)
      }
    })
  } 
};
