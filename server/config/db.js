const { default: mongoose } = require("mongoose");

const db = {
    connect: async () => {
        try {
            await mongoose.connect("mongodb+srv://Shahin:dpStrMMw7RapXzHQ@academy.yjpmeka.mongodb.net/academy");
            console.log('CONNECTED!');

        } catch (err) {
            console.log('Mongodb connection error!!');
            console.log(err);
        }
    }
}

module.exports = {
    db
}