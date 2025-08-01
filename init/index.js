const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const mongo_URL = 'mongodb://127.0.0.1:27017/YatraBnB';



main().then(() => {
 console.log("connected to DB");
}).
catch((err)=> {
    console.log(err);
});



async function main() {
    await mongoose.connect(mongo_URL);
}

const initDB = async () => {
 await Listing.deleteMany({});
 initData.data.map((obj) => ({...obj  }));
 await Listing.insertMany(initData.data);
 console.log(" data was initialized");
};


initDB();