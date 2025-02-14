const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
.then((res) => {
    console.log("Connection Established");
})
.catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: '676c6ba6bf3afbb8231aab50',
    }));
    await Listing.insertMany(initData.data);
    console.log("data saved");
}
initDB();