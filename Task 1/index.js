const express = require("express");
const app = express();
const cors = require('cors');
const http = require("http");
const httpsServer = http.createServer(app);
const bodyParser = require("body-parser");
const port = 3000;
const submit = require('./module/PhonesParser/route');
const db = require("./models");

/*Middlewares */
app.use(cors())
app.use(bodyParser.json());

/*Submit File */
app.use("/api/", submit);




  db.sequelize.sync().then((req) => {
    httpsServer.listen(port, () => {
        console.log(`NavVis code challenge listening on port ${port}`)
    });
});

  module.exports = app;