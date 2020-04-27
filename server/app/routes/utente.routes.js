const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/server/all", controller.allAccess);

    app.get(
        "/api/server/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/server/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/server/admin",
        [authJwt.verifyToken, authJwt.isRistoratore],
        controller.adminBoard
    );
};