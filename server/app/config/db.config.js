module.exports = {
    HOST: "localhost",
    USER: "my_user",
    PASSWORD: "mypsw",
    DB: "my_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};