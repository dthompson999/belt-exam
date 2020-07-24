console.log("pet.routes.js");

const Pet = require("../controllers/pet.controller");

module.exports = app => {
    app.get("/api/pet", Pet.getAll);
    app.post("/api/pet/new", Pet.create);
    app.get("/api/pet/:_id", Pet.getOne);
    app.put("/api/pet/update/:_id", Pet.update);
    app.delete("/api/pet/delete/:_id", Pet.delete);
}