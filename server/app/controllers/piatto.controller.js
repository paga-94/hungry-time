const db = require("../models");
const Piatti = db.piatto;
const Op = db.Sequelize.Op;

// Recupera tutti i piatti da id ristorante
exports.findAll = (req, res) => {
    const idRistorante = req.params.id;

    Piatti.findAll({ where: { id_ristorante: idRistorante } })
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
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({
            message: "i piatti devono avere un nome!"
        });
        return;
    }

    // Crea piatto
    const piatto = {
        nome: req.body.nome,
        tipo: req.body.tipo,
        id_ristorante: req.body.id_ristorante,
        prezzo: req.body.prezzo
    };

    // Save Tutorial in the database
    Piatti.create(piatto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// cancella piatto
exports.delete = (req, res) => {
    const id = req.params.id;

    Piatti.destroy({
        where: { id: id }
    })
        .then(() => {
            res.send({
                    message: "cancellato"
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "errore cancellando il piatto id=" + id
            });
        });
};

/*

// aggiorna piatti di un ristorante
exports.update = (req, res) => {
    const idRistorante = req.params.id;

    Piatti.update(req.body, {
        where: { id_ristorante: idRistorante }
    })
        .then(num => {
            if (num) {
                res.send({
                    message: "Menu aggiornato correttamente."
                });
            } else {
                res.send({
                    message: "Menu non aggiornato."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "errore durante l'aggiornamento del menu"
            });
        });
};
*/