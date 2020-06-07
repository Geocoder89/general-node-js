const Cart = require('./cart')
const db = require('../util/database')


module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl,
      this.price = price,
      this.description = description;
  }

  save() {
    return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES(?,?,?,?)',
    [this.title,this.price ,this.description,this.imageUrl]
    )
  }

  static deleteById(id) {
   
  }
  static fetchAll() {
    // here we return the promise executed from our querying of the table in our database
  return db.execute('SELECT * from products')
  }

  static findById(id) {
    return db.execute('SELECT * from products where products.id = ?',[id])
  }
};
