const express = require('express'),
    path = require('path'),
    app = express();

app.use(express.static(path.join(__dirname, '/./')));
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);