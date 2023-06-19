const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log('Mongoose connected');
}).catch((err)=> {
    console.log(err, "***Mongoose not connectd***");
});
