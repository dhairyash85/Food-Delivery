const mongoose = require('mongoose');
const mongoURI='mongodb://user2000:abcd5555@ac-rez9hxt-shard-00-00.yi64oh8.mongodb.net:27017,ac-rez9hxt-shard-00-01.yi64oh8.mongodb.net:27017,ac-rez9hxt-shard-00-02.yi64oh8.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-reykrf-shard-0&authSource=admin&retryWrites=true&w=majority'

const connectToMongo=async()=> {
    try {
        mongoose.set("strictQuery", false);
        console.log("Connecting")
        mongoose.connection.on('connected', () => console.log('connected'));
        mongoose.connection.on('open', () => console.log('open'));
        mongoose.connection.on('disconnected', () => console.log('disconnected'));
        mongoose.connection.on('reconnected', () => console.log('reconnected'));
        mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
        mongoose.connection.on('close', () => console.log('close'));
        var connection=mongoose.connection
        connection.once('open', async()=>{
          // console.log("yyyyyyy")
          const items  =connection.db.collection("food_items");
          const category  =connection.db.collection("food_category");
          global.food_items=await items.find({}).toArray()
          global.food_category=await category.find({}).toArray()
          // console.log(global.food_items)
          
        })
        await mongoose.connect(mongoURI)
      } catch (error) {
        console.log(error, "err");
      }
}
module.exports=connectToMongo
