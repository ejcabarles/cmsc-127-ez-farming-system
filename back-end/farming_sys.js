var mysql = require("mysql");
var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'useruser',
	  database : 'farming_sys'
	});

connection.connect(function(err){
	if(!err) {
	    console.log("Database is connected ... nn");    
	} else {
	    console.log("Error connecting database ... nn");    
	}
});

// PUT FUNCTIONS HERE


// PLOTS
exports.viewPlotInformation = function(req, res) {
	connection.query('call viewAllPlot()', function(err, row) {
		if(err) res.send(err);
		else res.send(row);
	});
};

exports.addPlotInformation = function(req, res) {
	var post = {
		zone : req.body.zone,
		row : req.body.row,
		col : req.body.col
	};

	connection.query('call addPlot(?, ?, ?)', [post.zone, post.row, post.col], function(err, row) {
		if(err) res.send(err);
		else res.send("Successfully added plot information")
	});
};
exports.deletePlotInformation = function(req, res) {
	connection.query('call deletePlot(?)', [req.params.id], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}






// REQUEST
exports.viewRequestInformation = function(req, res) {
	connection.query('call viewAllRequest()', function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}





// FERTILIZER
exports.viewFertilizerInformation = function(req, res) {
	connection.query('call viewAllFertilizer()', function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}
exports.addFertilizerInformation = function(req, res) {
	var post = {
		brand: req.body.brand,
        type: req.body.type,
        nitrogen: req.body.nitrogen,
        phosphorus: req.body.phosphorus,
        potassium: req.body.potassium,
	}
	connection.query('call addFertilizer(?, ?, ?, ?, ?)', [post.brand, post.type, post.nitrogen, post.phosphorus, post.potassium], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}
exports.deleteFertilizerInformation = function(req, res) {
	connection.query('call deleteFertilizer(?)', [req.params.id], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}



// PERSONNEL

exports.viewPersonnelInformation = function(req, res) {
	connection.query('call viewAllUser()', function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}

exports.addPersonnelInformation = function(req, res) {
	var post = {
		username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        position: req.body.position
	}
	console.log(post);
	connection.query('call addUser(?, ?, ?, ?, ?, ?)', [post.username, post.password, post.firstname, post.lastname, post.birthday, post.position], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}
exports.deletePersonnelInformation = function(req, res) {
	connection.query('call deleteUser(?)', [req.params.id], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}


exports.editPersonnelInformation = function(req, res) {
	var post = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        position: req.body.position,
    }
	connection.query('call editUser(?, ?, ?, ?, ?, ?)', [req.params.id, post.username, post.firstname, post.lastname, post.birthday, post.position], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}