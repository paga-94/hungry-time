module.exports = (sequelize, Sequelize) => {
    const PrenotazionePiatto = sequelize.define("prenotazione_piatto", {

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
        piattoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                // This is a reference to another model
                model: 'piatto',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
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
        id_prenotazione_tavolo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                // This is a reference to another model
                model: 'prenotazione_tavolo',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        persona: {
            type: Sequelize.INTEGER,
            allowNull: false
        }

    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false,
        });

    return PrenotazionePiatto;
};