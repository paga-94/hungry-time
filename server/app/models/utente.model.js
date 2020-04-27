module.exports = (sequelize, Sequelize) => {
    const Utente = sequelize.define("utente", {

        username: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        data_di_nascita: {
            type: Sequelize.DATE
        },
        affidability: {
            type: Sequelize.INTEGER
        },
        nome: {
            type: Sequelize.STRING(30)
        },
        cognome: {
            type: Sequelize.STRING(30)
        },
        sesso: {
            type: Sequelize.BOOLEAN
        },
        idRistorante: {
            type: Sequelize.INTEGER,
            defaultValue: null
        }
    },
        {
            freezeTableName: true
        });

    return Utente;
};