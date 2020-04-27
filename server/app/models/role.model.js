module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false,
        });

    return Role;
};