module.exports = app => {
    const ristorante = require("../controllers/ristorante.controller");

    const router = require("express").Router();

    // Retrieve all ristoranti
    router.get("/home", ristorante.findAll);

    router.get("/cerca", ristorante.findAll);

    // Retrieve a single ristorante with id
    router.get("/ristorante/:id", ristorante.findOne);

    // Update a ristorante with id (un ristorante può solo aggiornare il proprio)
    router.put("/ristoratore/:id", ristorante.update);

    app.use('/api', router);
};