const http = require('http');
//On importe l'application
const app = require('./app');
//On dit sur quel port l'app va tourner
app.set('port', process.env.PORT || 3000);
//On passe l'app au server
const server = http.createServer(app);
 

server.listen(process.env.PORT || 3000);