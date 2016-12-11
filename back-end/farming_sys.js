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
};
exports.editPlotInformation = function(req, res) {
	var post = {
        zone: req.body.zone,
        row: req.body.row,
        col: req.body.col,
    }
    console.log(post);
    console.log(req.params.id);
	connection.query('call editPlot(?, ?, ?, ?)', [req.params.id, post.zone, post.row, post.col], function(err, row){
		if(err) res.send(err);
		else res.send("Successful!");
	});
};






// REQUEST
exports.viewRequestInformation = function(req, res) {
	connection.query('call viewAllRequest()', function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}

exports.addRequest = function(req, res) {
	var post = {
		planneddate : req.body.planneddate,
		actualdate : req.body.actualdate,
		applicationtype : req.body.applicationtype,
		status : req.body.status,
		userid : req.body.userid,
	};
	connection.query('call addRequest(?, ?, ?, ?, ?)', [post.planneddate, post.actualdate, post.applicationtype, post.status, post.userid], function(err, row){
			if(err) res.send(err);
			else res.send(row);
		});

	
};

exports.addPlots = function(req, res) {
	console.log(req.body)

	console.log(req.body.requestid)

	console.log(req.body.plotid)
	connection.query('call addReqPlot(?, ?)', [req.body.requestid, req.body.plotid], function(err, row){
		if (err) res.send(err);
		else res.send(row);
	});
};

exports.addFertilizers = function(req, res) {
	connection.query('call addReqFertilizer(?, ?)', [req.body.requestid, req.body.fertilizerid], function(err, row){
		if (err) res.send(err);
		else res.send(row);
	});
};

exports.getLastInsertId = function(req, res) {
	connection.query('SELECT LAST_INSERT_ID() as lastid', function(err, row){
		if (err) res.send(err);
		else res.send(row);
	});
};

exports.declineRequest = function(req, res) {
	connection.query('UPDATE request SET status = "DECLINED" WHERE requestid = ?', req.params.id, function(err, row){
		if (err) res.send(err);
		else res.send(row);
	});
};
exports.approveRequest = function(req, res) {
	connection.query('UPDATE request SET status = "APPROVED", actualdate = curdate() WHERE requestid = ?', req.params.id, function(err, row){
		if (err) res.send(err);
		else res.send(row);
	});
};






// APPLICATION
exports.viewFertilizerApplication = function(req, res){
	connection.query('call viewAllFertilizerApplication()', function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
}
exports.addApplicationInformation = function(req, res){
	var post = {
		planneddate : req.body.planneddate,
		actualdate : req.body.actualdate,
		applicationtype : req.body.applicationtype,
		userid : req.body.userid,
	};
	console.log(post);
	connection.query('call addFertilizerApplication(?, ?, ?, ?)', [post.planneddate, post.actualdate, post.applicationtype, post.userid], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
};
exports.addAppPlot = function(req, res){
	connection.query('call addAppPlot(?, ?)', [req.body.appid, req.body.plotid], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
};
exports.addAppFertilizer = function(req, res){
	console.log(req.body);
	connection.query('call addAppFertilizer(?, ?)', [req.body.appid, req.body.fertilizerid], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
};
exports.editFertilizerApplication = function(req, res){
	var post = {
		planneddate: req.body.planneddate,
		actualdate: req.body.actualdate, 
		applicationtype: req.body.applicationtype
	}
	console.log(req.body);
	connection.query('call editFertilizerApp(?, ?, ?, ?)', [req.params.id, post.planneddate, post.actualdate, post.applicationtype], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
};
exports.deleteFertilizerApplication = function(req, res) {
	connection.query('call deleteFertilizerApplication(?)', [req.params.id], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
};
exports.deleteAppPlot = function(req, res) {
	connection.query('call deleteAppPlot(?)', [req.params.id], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
};
exports.deleteAppFertilizer = function(req, res) {
	connection.query('call deleteAppFertilizer(?)', [req.params.id], function(err, row){
		if(err) res.send(err);
		else res.send(row);
	});
};





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
};

exports.editFertilizerInformation = function(req, res) {
	var post = {
        brand: req.body.brand,
        type: req.body.type,
        nitrogen: req.body.nitrogen,
        phosphorus: req.body.phosphorus,
        potassium: req.body.potassium,
    }
    console.log(post);
    console.log(req.params.id);
	connection.query('call editFertilizer(?, ?, ?, ?, ?, ?)', [req.params.id, post.brand, post.type, post.nitrogen, post.phosphorus, post.potassium], function(err, row){
		if(err) res.send(err);
		else res.send("Successful!");
	});
};



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
    console.log(post);
    console.log(req.params.id);
	connection.query('call editUser(?, ?, ?, ?, ?, ?)', [req.params.id, post.username, post.firstname, post.lastname, post.birthday, post.position], function(err, row){
		if(err) res.send(err);
		else res.send("Successful!");
	});
}