const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.ristoranti = require("./ristorante.model.js")(sequelize, Sequelize);
db.piatto = require("./piatto.model.js")(sequelize, Sequelize);
db.utente = require("./utente.model.js")(sequelize, Sequelize);
db.prenotazioneTavolo = require("./prenotazione_tavolo.model.js")(sequelize, Sequelize);
db.prenotazionePiatto = require("./prenotazione_piatto.model.js")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.orariRistorante = require("./orariRistorante.model")(sequelize, Sequelize);

db.role.belongsToMany(db.utente, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.utente.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.piatto.hasOne(db.prenotazionePiatto);

db.prenotazionePiatto.belongsTo(db.piatto);



db.ROLES = ["utente", "ristoratore", "moderatore"];

/*
db.ristoranti.hasMany(db.piatto);
db.piatto.belongsTo(db.ristoranti);
*/

module.exports = db;