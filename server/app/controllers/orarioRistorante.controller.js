const db = require("../models");
const OrariRistorante = db.orariRistorante;
const Op = db.Sequelize.Op;

// Recupera orari ristorante da id
exports.findAll = (req, res) => {
    const idRistorante = req.params.idRistorante;

    OrariRistorante.findAll({where: { id_ristorante: idRistorante } })
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