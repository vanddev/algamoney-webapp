const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/algamoney-webapp'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/algamoney-webapp/index.html');
});

app.listen(process.env.PORT || 4200);