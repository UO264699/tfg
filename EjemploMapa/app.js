let express = require('express');
let app = express();

//
let engine = require('ejs-mate');

app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.set('views', 'views');




//
let mongo = require('mongodb');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('db','mongodb://admin:tfg@tfg-shard-00-00.nck0r.mongodb.net:27017,tfg-shard-00-01.nck0r.mongodb.net:27017,tfg-shard-00-02.nck0r.mongodb.net:27017/tfg?ssl=true&replicaSet=atlas-7dog2s-shard-0&authSource=admin&retryWrites=true&w=majority')

//static files
app.use(express.static('public'));

let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);

require("./routes/rmapa.js")(app,gestorBD);

//
app.set('port',3000);


//app.get('/',(req,res) => {
//res.render('mapa');
//});



//
app.listen(app.get('port'), function() {
    console.log("Servidor listo ");
});