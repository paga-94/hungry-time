const db = require("../models");
const PrenotazionePiatto = db.prenotazionePiatto;
const Piatto = db.piatto;
const Op = db.Sequelize.Op;

// Recupera tutti i piatti da id ristorante
exports.findAll = (req, res) => {
    const idPrenotazione = req.params.idPrenotazione;

    Piatto.findAll({ attributes: ['nome'], include: [{ model: PrenotazionePiatto, attributes: [ 'persona' ], where: { id_prenotazione_tavolo: idPrenotazione }}] })
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

//crea nuovo piatto
exports.create = (req, res) => {
    let message = [];
    let contatore = 0;

    req.body.forEach(piatto => {
        PrenotazionePiatto.create(piatto)
            .then( () => {
                if (contatore === req.body.length - 1) {
                    res.send({message: message})
                }
                message[contatore] = 'prenotazione effettuata';
                contatore += 1;
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Tutorial."
                });
            });
    });
};