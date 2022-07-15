//On importe l'application
//On dit sur quel port l'app va tourner
//On passe l'app au server

const http = require('http');
const app = require('./app');
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);