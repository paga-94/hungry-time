module.exports = app => {
    const tavolo = require("../controllers/tavolo.controller");

    const router = require("express").Router();

    router.get("/tavoli/:idRistorante", tavolo.findAll);

    router.get("/tavoli/:idRistorante/accettate", tavolo.findAccepted);

    router.get("/tavoli/:idRistorante/pending", tavolo.findPending);

    router.post("/tavolo/prenota", tavolo.create);

    router.put("/tavolo/:id/aggiorna", tavolo.update);

    app.use('/api', router);
};