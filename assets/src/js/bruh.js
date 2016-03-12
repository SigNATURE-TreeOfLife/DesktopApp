var fs = require("fs");
var file = "ITIS.sqlite";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// Class to hold data of name time and description
// Can add more variables later when needed
function dataObj (_name, _time, _description, _id) {
    this.name = _name;
    this.time = _time;
    this.description = _description;
    this.id = _id;
}

function getChildren(id, callback) {

	var children = [];

	db.serialize(function(){
		var stmt = db.prepare(
			"SELECT completename, longnames.tsn \
			FROM hierarchy JOIN longnames ON hierarchy.TSN = longnames.tsn \
			WHERE Parent_tsn = (?)");
		stmt.each([id], function(err, row) {
			var child = new dataObj(row.completename, "", "", row.tsn);
			children.push( child );
		}, function() {
      return callback(children);
    });
	});
}
