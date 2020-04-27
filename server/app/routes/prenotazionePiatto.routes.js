module.exports = app => {
    const prenotazionePiatto = require("../controllers/prenotazionePiatti.controller");

    const router = require("express").Router();

    router.post("/prenotazione/piatti", prenotazionePiatto.create);

    router.get("/:idPrenotazione/piattiPrenotazione", prenotazionePiatto.findAll);

    app.use('/api', router);
};