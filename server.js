import { app } from "./index.js";
import dataBase from "./data/mongoose.js";

const port = process.env.PORT;

//listening to the server tha will be running on the port 80
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
