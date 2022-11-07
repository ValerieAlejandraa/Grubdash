const router = require("express").Router(); //add routes and attach handlers to the router exported by this file

// TODO: Implement the /dishes routes needed to make the tests pass
const controller = require("./dishes.controller")
const methodNotAllowed= require("../errors/methodNotAllowed")

router
  .route("/:dishId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);


router
   .route("/")
   .get(controller.list)
   .post(controller.create)
   .all(methodNotAllowed);

module.exports = router;
