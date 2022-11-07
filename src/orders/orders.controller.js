const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));
// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass


// TODO: Implement the /dishes handlers needed to make the tests pass
//list
function list(req, res) {
  res.json({ data: res.locals.orders });
}

//validation middleware
function orderIdExists(req, res, next) {
  const orderId = req.params.orderId;
  const foundOrder = orders.find((order) => order.id === orderId); //checking each URL, to find the one that matches, it returns the FIRST ONE that matches
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next(); //we have to add return next() in middleware
  }
  next({
    status: 404,
    message: `Order id not found: ${orderId}`,
  });
}

function bodyDataHas(req, res, next) {
  const { data = {} } = req.body; //bracket notation
  if (data[propertyDeliverTo].length > 0) {
    return next();
  }
  next({ status: 400, message: `Order must include a ${propertyDeliverTo}.` });

  if (data[propertyMobileNumber].length > 0) {
    return next();
  }
  next({ status: 400, message: `Order must include a ${propertyMobileNumber}.` });

  if (data[propertyDishes] > 0 ){
    return next()
  } 
  next({status: 400, message: `Dish ${propertyDishes} must have a quantity that is an integer greater than 0`})

}

//read function
function read(req, res, next) {
  //side effect
  res.json({ data: foundDish });
}

function create(req, res, next) {
  const { data: { id, deliverTo, mobileNumber, status, dishes } = {} } = req.body;
  const newOrder = {
    id: nextId(),
    deliverTo: deliverTo,
    mobileNumber: mobileNumber,
    status: status,
    dishes: [dishes]
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}
function update(req, res) {
    const orderId = req.params.orderId;
    const foundOrder = orders.find((order) => order.id === orderId);
    const { data: { name, deliverTo, mobileNumber, status, dishes} = {} } = req.body;
  
    // update the paste
    foundOrder.name = name;
    foundOrder.deliverTo = deliverTo;
    foundOrder.mobileNumber= mobileNumber;
    foundOrder.status = status;
    foundOrder.dishes =  dishes;
  
    res.json({ data : foundOrder});
  }
  
  function destroy(req, res) {
    const { orderId } = req.params;
    const index = orders.findIndex((order) => order.id === orderId);
    if (index > -1) {
      orders.splice(index, 1);
    }
    res.sendStatus(204);
  }

module.exports = {
  list,
  read: [orderIdExists, read],
  create: [
    bodyDataHas("name"),
    bodyDataHas("deliverTo"),
    bodyDataHas("mobileNumber"),
    bodyDataHas("status"),
    bodyDataHas("dishes"),
    create,
  ],
  update: [
    dishIdExists,
    bodyDataHas("name"),
    bodyDataHas("deliverTo"),
    bodyDataHas("mobileNumber"),
    bodyDataHas("status"),
    bodyDataHas("dishes") ,
    update
   ],
  
    delete: [orderIdExists, destroy]
};
