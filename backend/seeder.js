const mongoose = require('mongoose');
const dotenv = require('dotenv');
 

const users = require('./dummyData/users')
const products = require( './dummyData/products')
const UserModal = require( './src/Models/UserModal')
const ProductModal = require( './src/Models/ProductModal')
const OrderModal = require( './src/Models/OrderModal')
const dbConnection = require('./server')
require('colors')

dotenv.config();

dbConnection();

const importData = async()=>{

    try {
        // await OrderModal.deleteMany()
        // await UserModal.deleteMany()
        // await ProductModal.deleteMany()

        // create user 
        const createUsers = await UserModal.insertMany(users)
        // create product 
        const adminUser = createUsers[0]._id  // admin purpose
        const sampleProducts = products.map((product)=>{
            return ({...product , user: adminUser})
        })

        await ProductModal.insertMany(sampleProducts);

        console.log('Data Imported !'.green.inverse);
        process.exit();
        
    } catch (error) {
        res.status(404).send(error.message)
        console.log(error);
        process.exit(1)
    }

}

const destroyData = async()=>{

    try {
        await OrderModal.deleteMany()
        await UserModal.deleteMany()
        await ProductModal.deleteMany()

        console.log('Data deleted !'.red.inverse);
        process.exit();

    } catch (error) {
        res.status(404).send(error.message)
        console.log(error);
        // process.exit(1)
    }

}

if(process.argv[2] === '-d'){
    destroyData();
} else {
    importData()
}