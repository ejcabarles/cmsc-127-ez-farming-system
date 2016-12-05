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


//PLOTS
exports.viewPlotInformation = function(req, res) {
	connection.query('SELECT * FROM plot', function(err, row) {
		if(err) res.send('Error in viewing plot information!');
		else res.send(row)
	});
};

exports.addPlotInformation = function(req, res) {
	var post = {
		plotid : req.body.plotid,
		zone : req.body.zone,
		row : req.body.row,
		col : req.body.col
	};

	connection.query('INSERT INTO plot SET ?', post, function(err, row) {
		if(err) res.send('Error in adding plot information!');
		else res.send("Successfully added plot information");
	});
};

exports.editPlotInformation = function(req, res){
	console.log(req.body);
	connection.query('UPDATE plot SET ? WHERE plotid=?', [req.body, req.params.plotid], function(err,row){
		if(err) res.send(err);
		else res.send("Successfully editing plot information");
	});
};

exports.deletePlotInformation = function(req, res) {
	connection.query('DELETE FROM plot WHERE plotid=?',req.params.plotid, function(err, row) {
		if(err) res.send('Error in deleting plot information');
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Not found!'});
		} else {
			res.status(200).send(row);
		}
	});
};



// FARM FERTILIZER APPLICATION
exports.viewApplicationInformation = function(req, res) {
	connection.query('SELECT * FROM application', function(err, row) {
		if(err) res.send('Error in viewing farm fertilizer applications!');
		else res.send(row)
	});
};

exports.addFertilizerApplication = function(req, res) {
	var post = {
		applicationid : req.body.applicationid,
		planneddate : req.body.planneddate,
		actualdate : req.body.actualdate,
		applicationtype : req.body.applicationtype,
		userid : req.body.userid,
		fertilizerid : req.body.fertilizerid
	};

	connection.query('INSERT INTO fertilizerapplication SET ?', post, function(err, row) {
		if(err) res.send('Error in adding fertilizer application information!');
		else res.send("Successfully added fertilizer application information")
	});
};

exports.editFertilizerApplication = function(req, res){
	console.log(req.body);
	connection.query('UPDATE application SET ? WHERE appid=?', [req.body, req.params.plotid], function(err,row){
		if(err) res.send(err);
		else res.send("Successfully editing farm fertilizer applications!");
	});
};

exports.deleteFertilizerApplication = function(req, res) {
	connection.query('DELETE FROM application WHERE appid=?',req.params.plotid, function(err, row) {
		if(err) res.send('Error in deleting farm fertilizer applications!');
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Not found!'});
		} else {
			res.status(200).send(row);
		}
	});
}


// PERSONNEL

exports.viewPersonnelInformation = function(req, res) {
	connection.query('SELECT * FROM user', function(err, row) {
		if(err) res.send('Error in viewing personnel information!');
		else res.send(row)
	});
};

exports.addPersonnelInformation = function(req, res) {
	var post = {
		userid : req.body.userid,
 		username : req.body.username,
		password : req.body.password,
		firstname : req.body.firstname,
		lastname : req.body.lastname,
		birthday : req.body.birthday,
  		position : req.body.position,
	};

	connection.query('INSERT INTO user SET ?', post, function(err, row) {
		if(err) res.send('Error in adding personnel!');
		else res.send("Successfully added personnel!");
	});
};

exports.editPersonnelInformation = function(req, res){
	console.log(req.body);
	connection.query('UPDATE user SET ? WHERE userid=?', [req.body, req.params.plotid], function(err,row){
		if(err) res.send(err);
		else res.send("Successfully editing farm fertilizer applications!");
	});
};

exports.deletePersonnelInformation = function(req, res) {
	connection.query('DELETE FROM user WHERE userid=?',req.params.plotid, function(err, row) {
		if(err) res.send('Error in deleting personnel!');
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Not found!'});
		} else {
			res.status(200).send(row);
		}
	});
}

// FERTILIZER

exports.viewFertilizerInformation = function(req, res) {
	connection.query('SELECT * FROM fertilizer', function(err, row) {
		if(err) res.send('Error in viewing personnel information!');
		else res.send(row)
	});
};

exports.addFertilizerInformation = function(req, res) {
	var post = {
		fertilizerid : req.body.fertilizerid,
		fertilizerbrand : req.body.fertilizerbrand,
		fertilizertype : req.body.fertilizertype,
		nitrogen : req.body.nitrogen,
		phosphorus : req.body.phosphorus,
		potassium : req.body.potassium
		//pk id
	};

	connection.query('INSERT INTO fertilizer SET ?', post, function(err, row) {
		if(err) res.send('Error in adding personnel!');
		else res.send("Successfully added personnel!");
	});
};

exports.editFertilizerInformation = function(req, res){
	console.log(req.body);
	connection.query('UPDATE fertilizer SET ? WHERE fertilizerid=?', [req.body, req.params.plotid], function(err,row){
		if(err) res.send(err);
		else res.send("Successfully editing farm fertilizer applications!");
	});
};

exports.deleteFertilizerInformation = function(req, res) {
	connection.query('DELETE FROM fertilizer WHERE fertilizerid=?',req.params.plotid, function(err, row) {
		if(err) res.send('Error in deleting personnel!');
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Not found!'});
		} else {
			res.status(200).send(row);
		}
	});
}


// SEND REQUEST

exports.addRequest = function(req, res) {
	var post = {
		requestid : req.body.requestid,
		planneddate : req.body.planneddate,
		actualdate : req.body.actualdate,
		status : req.body.status,
		userid : req.body.userid,
		fertilizerid : req.body.fertilizerid
	};

	connection.query('INSERT INTO fertilizer SET ?', post, function(err, row) {
		if(err) res.send('Error in adding personnel!');
		else res.send("Successfully added personnel!");
	});
};
