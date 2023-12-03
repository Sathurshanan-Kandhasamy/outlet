import mongoose from 'mongoose';
import 'dotenv/config';
import users from './data/users.js';
import products from './data/products.js';
import USER from './models/user.js';
import PRODUCT from './models/product.js';
import ORDER from './models/order.js';
import CONNECT_TO_DATABASE from './config/database.js';

// Connects to MongoDB database.
CONNECT_TO_DATABASE();

// Inserts data in database.
const IMPORT_DATA = async () => {
  try {
    await ORDER.deleteMany();
    await PRODUCT.deleteMany();
    await USER.deleteMany();

    const CREATED_USERS = await USER.insertMany(users);
    const ADMIN_USER = CREATED_USERS[0]._id;

    const SAMPLE_PRODUCTS = products.map((product) => {
      return {
        ...product,
        user: ADMIN_USER,
      };
    });
    await PRODUCT.insertMany(SAMPLE_PRODUCTS);

    console.log('Data imported.');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Deletes data in database.
const DESTROY_DATA = async () => {
  try {
    await ORDER.deleteMany();
    await PRODUCT.deleteMany();
    await USER.deleteMany();

    console.log('Data destroyed.');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// If argument is -d delete data else insert data in database.
if (process.argv[2] === '-d') {
  DESTROY_DATA();
} else {
  IMPORT_DATA();
}
