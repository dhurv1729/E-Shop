import mongoose from "mongoose";
import dotenv from "dotenv";
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import users from './data/users.js';
import products from './data/products.js';
import connectDB from './config/db.js';


dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUser = await User.insertMany(users);
        const adminUser = createdUser[0]._id;

        const productSample = products.map(p => {
            return {...p, user: adminUser}
        });

        await Product.insertMany(productSample);
        console.log('Data Imported!');
        exit(0);

    } catch (error) {
        console.log(`${error.message}`);
        exit(1);
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('Data destroyed!');
        exit();

    } catch (error) {
        console.log(`${error.message}`);
        exit(1);
    }
}

if(process.argv[2] == '-d') {
    destroyData();
}
else {
    importData();
}