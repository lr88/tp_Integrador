const express = require('express');
var app = express();
const path = require('path');
const PORT = 3001
global.appRoot = path.resolve(__dirname).replace(/\\/g, '/');
app.set("views", path.join(__dirname, "views"));
app.engine('.ejs', require('ejs').__express);
app.use(express.static(path.join(__dirname, 'js')));

app.get('/', function(req, res) {
    res.render('home.ejs');
});

app.listen(PORT);
console.log('Running at PORT ' + PORT);
