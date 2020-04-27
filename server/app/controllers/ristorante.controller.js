const db = require("../models");
const Ristoranti = db.ristoranti;
const Op = db.Sequelize.Op;

/* Create and Save a new Tutorial
exports.create = (req, res) => {

};

 */

// Retrieve all Ristoranti from the database.
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

    Ristoranti.findAll({ where: condition })
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

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ristoranti.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Ristoranti.update(req.body, {
        where: { id: id }
    })
        .then(() => {
            res.send({
                    message: "Pagina ristorante aggiornata correttamente."
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "errore durante l'aggiornamento del ristorante"
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};