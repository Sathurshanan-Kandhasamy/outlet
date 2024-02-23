import mongoose from 'mongoose';
import 'dotenv/config';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/user.js';
import Product from './models/product.js';
import Order from './models/order.js';
import connectToDatabase from './configuration/database.js';

// Connect to MongoDB database.
connectToDatabase();

// Insert data in database.
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleProducts);

    console.log('Data imported.');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Delete data in database.
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed.');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// If argument is -d delete data else insert data in database.
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
