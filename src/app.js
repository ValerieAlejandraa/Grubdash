const express = require("express"); //contains express application, Express provides methods to specify what function is called for a particular HTTP verb ( GET , POST , SET , etc.) and URL pattern ("Route"), and methods to specify what template ("view") engine is used, where template files are located, and what template to use to render a response.
const cors = require("cors");  

//make code available
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const ordersRouter = require("./orders/orders.router");
const dishesRouter = require("./dishes/dishes.router");

const app = express(); //create server

// You have not learned about CORS yet.
// The following line let's this API be used by any website.
app.use(cors()); //apply cors to every request that comes in
app.use(express.json());

//sorting the endpoints
app.use("/dishes", dishesRouter); 
app.use("/orders", ordersRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
