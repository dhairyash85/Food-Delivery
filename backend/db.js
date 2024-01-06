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
        await mongoose.connect(mongoURI)

        const fetched_data= mongoose.connection.db.collection("food_items")
        await fetched_data.find({}).toArray(function(err, data){
            if(err) console.log("error", err, "error")
            else console.log(data)
        })
      } catch (error) {
        console.log(error, "err");
      }
}
module.exports=connectToMongo
