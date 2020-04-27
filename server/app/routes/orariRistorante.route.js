module.exports = app => {
    const orari = require("../controllers/orarioRistorante.controller");

    const router = require("express").Router();

    // recupera patti in base al ristorante
    router.get("/:idRistorante/orari", orari.findAll);

    //router.delete("/piatto/:id", piatto.delete);

    //router.post("/ristoratore/aggiungiPiatto", piatto.create);

    // Aggiorna piatti del ristorante (un ristorante può solo aggiornare i propri)
    //router.put("/ristoratore/:id/piatti", piatto.update);

    app.use('/api', router);
};