const $ = require('jQuery');
global.jQuery = require('jQuery');
var fs = require("fs");
var file = "ITIS.sqlite";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// Class to hold data of name time and description
// Can add more variables later when needed
function dataObj (_name, _time, _description, _id, _rank_name, _vernacular_name) {
    this.name = _name;
    this.time = _time;
    this.description = _description;
    this.id = _id;
    this.rank_name = _rank_name;
    this.vernacular_name = _vernacular_name;
}

function getChildren(id, callback) {

	var children = [];

	db.serialize(function(){
		var stmt = db.prepare(
			"SELECT completename, longnames.tsn, rank_name, GROUP_CONCAT(vernacular_name, '/') AS `vernacular_name` \
			FROM hierarchy \
				JOIN longnames ON hierarchy.TSN = longnames.tsn \
				JOIN taxonomic_units ON hierarchy.TSN = taxonomic_units.tsn \
				JOIN taxon_unit_types ON \
					taxonomic_units.rank_id = taxon_unit_types.rank_id AND \
					taxonomic_units.kingdom_id = taxon_unit_types.kingdom_id \
        LEFT JOIN vernaculars ON hierarchy.TSN = vernaculars.tsn AND language = 'English' \
			WHERE hierarchy.Parent_tsn = (?) \
      GROUP BY longnames.tsn");
		stmt.each([id], function(err, row) {
      if (err) alert(err);
			var child = new dataObj(row.completename, "", "", row.tsn, row.rank_name, row.vernacular_name);
			children.push( child );
		}, function() {
      		return callback(children);
    	});
	});
}

function withParent(tsn, callback) {
  db.serialize(function(){
    var stmt = db.prepare("SELECT Parent_TSN FROM hierarchy WHERE TSN = (?)");
    stmt.get([tsn], function(err, row){
      console.log(row);
      return callback(row.Parent_TSN);
    });
  });
}
