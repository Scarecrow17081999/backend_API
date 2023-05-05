import mongoose from "mongoose";
const db = process.env.MONGO_URL;
const dataBase = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

export default dataBase;
