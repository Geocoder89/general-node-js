const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const app = express();
const PORT = 3000;

const errorController = require("./controllers/error");

const sequelize = require("./util/database");

const User = require("./models/user");

const Product = require("./models/product");

const Cart = require('./models/cart');

const Order = require('./models/order')

const CartItem = require('./models/cart-item')

const OrderItem = require('./models/order-item')

// this is the configuration to initialize express handlebars
// app.engine('hbs',expressHbs({
//     layoutsDir:'views/layouts/',defaultLayout:'main-layout',
//     extname:'hbs'})
// );

// app.set('view engine', 'hbs')

// this is the configuration to initialize ejs templates

app.set("view engine", "ejs");
app.set("views", "views");
// this is the configuration to set up the pug view engine
// app.set('view engine', 'pug');

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

const errorRoutes = require("./routes/error");

// third party packages set up
// this is a package to parse our incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
// configuration to serve static files
app.use(express.static(path.join(__dirname, "public")));

// middleware designed to retrieve a user from the database

app.use((req,res,next)=> {
    User.findByPk(1).then(user => {
      req.user = user;
      next();
    }).catch(err=> {
      console.log(err)
    })
})

// route setup
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

// Association set up
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

User.hasMany(Product);

// they are both the same thing actually
User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product,{through: CartItem})

Product.belongsToMany(Cart,{through: CartItem})

// the same thing too
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product,{through:OrderItem})

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      User.create({
        name: "Oladele",
        email: "Oladeleomoarukhe89@gmail.com",
      });
      
    }
    return user;
  })
  .then(user=> {
    // console.log(user);
    return user.createCart()
      
  }).then(cart=> {
    app.listen(PORT, (req, res) => {
      console.log(`App is listening on Port ${PORT}`);
    })
  }).catch((err) => {
    console.log(err);
  });
