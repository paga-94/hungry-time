module.exports = (sequelize, Sequelize) => {
    const PrenotazioneTavolo = sequelize.define("prenotazione_tavolo", {

        id_ristorante: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                // This is a reference to another model
                model: 'ristorante',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        id_utente: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                // This is a reference to another model
                model: 'utente',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        data: {
            type: Sequelize.DATE
        },
        orario: {
            type: Sequelize.TIME
        },
        numero_persone: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        voto: {
            type: Sequelize.DOUBLE
        },
        confermata: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        accettata: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        rifiutata: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        conclusa: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false,
        });

    return PrenotazioneTavolo;
};