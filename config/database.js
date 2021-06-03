// Export mongoose
const mongoose = require("mongoose");

// Assign MongoDB connection string to Uri
const uri =
  "mongodb+srv://mr_mendes:mendes123456@cluster0.k8sck.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Assign optional settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options).then(
  () => {
    console.log("Database connected!");
  },
  (error) => {
    console.log("Error connecting Database:", error);
  }
);
