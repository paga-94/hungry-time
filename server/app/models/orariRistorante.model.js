module.exports = (sequelize, Sequelize) => {
    const orariRistorante = sequelize.define("orari_ristorante", {

            // id ristorante
            id_ristorante: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    // This is a reference to another model
                    model: 'ristorante',

                    // This is the column name of the referenced model
                    key: 'id'
                }
            },
            lunedi_open: {
                type: Sequelize.DATE
            },
            lunedi_close: {
                type: Sequelize.DATE
            },
            martedi_open: {
                type: Sequelize.DATE
            },
            martedi_close: {
                type: Sequelize.DATE
            },
            mercoledi_open: {
                type: Sequelize.DATE
            },
            mercoledi_close: {
                type: Sequelize.DATE
            },
            giovedi_open: {
                type: Sequelize.DATE
            },
            giovedi_close: {
                type: Sequelize.DATE
            },
            venerdi_open: {
                type: Sequelize.DATE
            },
            venerdi_close: {
                type: Sequelize.DATE
            },
            sabato_open: {
                type: Sequelize.DATE
            },
            sabato_close: {
                type: Sequelize.DATE
            },
            domenica_open: {
                type: Sequelize.DATE
            },
            domenica_close: {
                type: Sequelize.DATE
            },
            durata_slot: {
                type: Sequelize.INTEGER
            },
            posti_per_slot: {
                type: Sequelize.INTEGER
            }

        },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        });

    return orariRistorante;
};