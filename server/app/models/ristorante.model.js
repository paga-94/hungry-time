module.exports = (sequelize, Sequelize) => {
    const ristorante = sequelize.define("ristorante", {


        nome: {
            type: Sequelize.STRING(30),
        },
        citta: {
            type: Sequelize.STRING(30)
        },
        indirizzo: {
            type: Sequelize.STRING(30)
        },
        tipo_cucina: {
            type: Sequelize.STRING(30)
        },
        voto: {
            type: Sequelize.DOUBLE
        },
        sorgente_immagine: {
            type: Sequelize.STRING(200)
        },
        descrizione: {
            type: Sequelize.STRING(300)
        }
    },
        {
            freezeTableName: true
        });

    return ristorante;
};