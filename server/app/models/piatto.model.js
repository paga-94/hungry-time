module.exports = (sequelize, Sequelize) => {
    const Piatto = sequelize.define("piatto", {

        nome: {
            type: Sequelize.STRING(30),
        },
        descrizione: {
            type: Sequelize.STRING(150),
            defaultValue: 'un ottimo piatto'
        },
        id_ristorante: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'ristorante',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        tipo: {
            type: Sequelize.STRING(30)
        },
        voto: {
            type: Sequelize.DOUBLE
        },
        prezzo: {
            type: Sequelize.INTEGER
        }

    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false,
        });

    return Piatto;
};