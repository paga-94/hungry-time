const db = require("../models");
const Tavoli = db.prenotazioneTavolo;
const Op = db.Sequelize.Op;

// Recupera numero posti per prenotazioni tavoli da id ristorante
exports.findAll = (req, res) => {
    const idRistorante = req.params.idRistorante;
    const dataAttuale = new Date();

    Tavoli.findAll({ attributes: [ 'data', 'numero_persone' ], where: { id_ristorante: idRistorante, data: { [Op.gte]: dataAttuale }} })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

// recupera prenotazioni accettate dal ristorante
exports.findAccepted = (req, res) => {
    const idRistorante = req.params.idRistorante;
    const dataAttuale = new Date();

    Tavoli.findAll({ attributes: [ 'id', 'data', 'numero_persone' ], where: { id_ristorante: idRistorante,
            data: { [Op.gte]: dataAttuale }, confermata: true, accettata: true, conclusa: false},
            order: [['data', 'ASC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

exports.findPending = (req, res) => {
    const idRistorante = req.params.idRistorante;
    const dataAttuale = new Date();

    Tavoli.findAll({ attributes: [ 'id', 'data', 'numero_persone' ], where: { id_ristorante: idRistorante,
            data: { [Op.gte]: dataAttuale }, confermata: true, accettata: false, rifiutata: false},
            order: [['data', 'ASC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

//crea nuova prenotazione tavolo
exports.create = (req, res) => {
    // Validate request
    if (!req.body.numero_persone) {
        res.status(400).send({
            message: "la prenotazione deve contere il numero di persone!"
        });
        return;
    }

    // Crea prenotazione tavolo
    const prenotazione = {
        id_ristorante: req.body.id_ristorante,
        id_utente: req.body.id_utente,
        data: req.body.data,
        numero_persone: req.body.numero_persone,
    };

    // salva prenotazione tavolo e restituisce id prenotazione salvata come risposta
    Tavoli.create(prenotazione)
        .then((data) => {
            res.send({ message: 'prenotazione salvata',
                id: data.id
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tavoli.update(req.body, {
        where: { id: id }
    })
        .then(() => {
            res.send({
                message: "prenotazione aggiornata correttamente."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "errore durante l'aggiornamento della prenotazione"
            });
        });
};