'use strict';

const config = require(__dirname + '/config/config');
const express = require('express');
const bodyParser = require('body-parser');
const farming_sys = require(__dirname + '/farming_sys')
const path = require('path');

var loggedIn = false;

let app = express();
var router = express.Router()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
    
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
    

//app.use(express.static(__dirname + '/'));
//app.use(express.static(__dirname + '/../frontend'));

// put functions here



// PLOTS
app.get('/viewPlotInformation', function(req, res) {
	farming_sys.viewPlotInformation(req, res);
});
app.post('/addPlotInformation', function(req, res) {
    farming_sys.addPlotInformation(req, res);
});
app.delete('/deletePlotInformation/:id', function(req, res) {
    farming_sys.deletePlotInformation(req, res);
});





// REQUEST
app.get('/viewRequestInformation', function(req, res) {
    farming_sys.viewRequestInformation(req, res);
});




// FERTILIZER
app.get('/viewFertilizerInformation', function(req, res) {
    farming_sys.viewFertilizerInformation(req, res);
});
app.post('/addFertilizerInformation', function(req, res) {
    farming_sys.addFertilizerInformation(req, res);
});
app.delete('/deleteFertilizerInformation/:id', function(req, res){
    farming_sys.deleteFertilizerInformation(req, res);
});




// PERSONNEL
app.get('/viewPersonnelInformation', function(req, res) {
    farming_sys.viewPersonnelInformation(req, res);
});
app.post('/addPersonnelInformation', function(req, res) {
    farming_sys.addPersonnelInformation(req, res);
});
app.delete('/deletePersonnelInformation/:id', function(req, res){
    farming_sys.deletePersonnelInformation(req, res);
});
app.put('/editPersonnelInformation/:id', function(req, res){
    farming_sys.editPersonnelInformation(req, res);
});




app.listen(config.PORT, function (){
	console.log ('Server listening on Port: ' + config.PORT)
});



app.get('/bower', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/bower_components/Materialize/dist/css/materialize.min.css'));
});
app.get('/bower2', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/bower_components/Materialize/dist/js/materialize.js'));
});
app.get('/localCSS', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/style.css'));
});
app.get('/jquery', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/jquery-3.1.1.js'));
});
app.get('/angular', function(req, res) {
    res.sendFile(path.join(__dirname + '/../angular.min.js'));
});
app.get('/angular-route', function(req, res) {
    res.sendFile(path.join(__dirname + '/path/to/angular-route.js'));
    console.log(res);
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/index.html'));
});


app.get('/app', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/app.js'));
});

app.get('/headerController', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/controllers/headerController.js'));
});
app.get('/plotController', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/controllers/plotController.js'));
});
app.get('/personnelController', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/controllers/personnelController.js'));
});
app.get('/requestController', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/controllers/requestController.js'));
});
app.get('/fertilizerController', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/controllers/fertilizerController.js'));
});


app.get('/headerDirective', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/directives/headerDirective.js'));
});
app.get('/plotDirective', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/directives/plotDirective.js'));
});
app.get('/personnelDirective', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/directives/personnelDirective.js'));
});

app.get('/requestDirective', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/directives/requestDirective.js'));
});
app.get('/fertilizerDirective', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/directives/fertilizerDirective.js'));
});



app.get('/header', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/views/header.html'));
});
app.get('/plots', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/views/plots.html'));
});
app.get('/personnel', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/views/personnel.html'));
});

app.get('/request', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/views/request.html'));
});


app.get('/fertilizer', function(req, res) {
    res.sendFile(path.join(__dirname + '/../front-end/views/fertilizer.html'));
});
