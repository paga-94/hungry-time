const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// socket io
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(4000);



/*

const corsOptions = {
    origin: "http://192.168.1.171:8081"
};

 */

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../hungry-time-vue/dist'));

// simple route
app.get("/", (req, res) => {
    res.sendFile('../hungry-time-vue/dist/index.html')
});

// connessione a database
const db = require("./app/models");
db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
});

require("./app/routes/tavolo.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/utente.routes')(app);
require("./app/routes/ristorante.routes")(app);
require("./app/routes/piatto.routes")(app);
require("./app/routes/orariRistorante.route")(app);
require("./app/routes/prenotazionePiatto.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

io.on('connection', (socket) => {

    console.log(socket.id);

    socket.on('prenotazione-confermata', (data) => {
        socket.broadcast.emit('prenotazione', data);
        console.log('PRENOTAZIONE FATTA')
    });

    socket.on('accetta-prenotazione', () => {
        socket.broadcast.emit('prenotazione-accettata');
    });

    socket.on('rifiuta-prenotazione', () => {
        socket.broadcast.emit('prenotazione-rifiutata');
    });

    socket.on('disconnect', () => {
        console.log('utente disconnesso   ' + socket.id);
    })
});