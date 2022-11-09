const path = require("path"); //add middleware and handlers for dishes to this file, then export the functions for use by the router

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
//list
function list(req, res) {
  res.json({ data: dishes });
}

//read function
function read(req, res, next) {
  //side effect
  res.json({ data: res.locals.dish });
}

//validation middleware
function dishIdExists(req, res, next) {
  const dishId = req.params.dishId;
  const foundDish = dishes.find((dish) => dish.id === dishId); //checking each URL, to find the one that matches, it returns the FIRST ONE that matches
  if (foundDish) {
    res.locals.dish = foundDish;
    return next(); //we have to add return next() in middleware
  }
  next({
    status: 404,
    message: `Dish id not found: ${dishId}`,
  });
}

//validation hasValidPrice
function hasValidPrice(req,res,next){
  const { data: {price} ={}} = req.body 
  if (Number(price) > 0 && Number.isInteger(price) ){
     return next();
  } 
  next({status: 400, message: "Dish must have a price that is an integer greater than 0"})
}

function bodyDataHas(propertyName) {
 
  return function (req,res,next){
  
  const { data = {} } = req.body; //bracket notation
  if (data[propertyName]) {
    return next();
  }
  next({ status: 400, message: `Dish must include a ${propertyName}.` });

}
}


function create(req, res, next) {
  const { data: { name, description, price, image_url } = {} } = req.body;
  const newDish = {
    id: nextId(),
    name: name,
    description: description,
    price: price,
    image_url: image_url,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

//Validation for update PUT /dishes/:dishId

function isValidId(req, res, next) {
  let {data: { id } } = req.body;
  const dishId = req.params.dishId;
     //if id does not exist
  if (id === null || id === undefined || id === "") {
    return next();
  }  //if dish id does not match route id
  if (id !== dishId) {
    next({
      status: 400,
      message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`,
    });
  } else {
    next();
  }
}

function update(req, res) {
    const dishId = req.params.dishId;
    const foundDish = dishes.find((dish) => dish.id === dishId);
    const { data: { name, description, price, image_url } = {} } = req.body;
     
  
    
    foundDish.name = name;
    foundDish.description = description;
    foundDish.price = price;
    foundDish.image_url = image_url;
    
    res.json({ data: foundDish });
  } 
  

module.exports = {
  list,
  read: [dishIdExists,read],
  create: [
    bodyDataHas("name"),
    bodyDataHas("description"),
    bodyDataHas("price"),
    bodyDataHas("image_url"),
    hasValidPrice,
    create,
  ],

  update: [
    dishIdExists,
    isValidId,
    bodyDataHas("name"),
    bodyDataHas("description"),
    bodyDataHas("price"),
    bodyDataHas("image_url"),
    hasValidPrice,
    update,
  ]
};
