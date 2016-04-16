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


const bootstrap=require('bootstrap');
var $list = $("<ul>", {class:""});
$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        delay:{hide:"100"},
            content: function(){
              $bcrumb = $("<ul>", {class:""});
              $bcrumb.append($("#bc-list").clone().removeClass("hidden"));
              console.log($bcrumb.html());
              return $bcrumb.html();
            },
            html:true,
    });
});


var KingdomsData = [
    {name: "Bacteria",  time: "", description: "", rank_name: "Kingdom", vernacular_name: "Bacteria",  id: 50},
    {name: "Protozoa",  time: "", description: "", rank_name: "Kingdom", vernacular_name: "Protozoa",  id: 630577},
    {name: "Plantae",   time: "", description: "", rank_name: "Kingdom", vernacular_name: "Plants",    id: 202422},
    {name: "Animalia",  time: "", description: "", rank_name: "Kingdom", vernacular_name: "Animals",   id: 202423},
    {name: "Fungi",     time: "", description: "", rank_name: "Kingdom", vernacular_name: "Fungi",     id: 555705},
    {name: "Chromista", time: "", description: "", rank_name: "Kingdom", vernacular_name: "Chromista", id: 630578},
    {name: "Archaea",   time: "", description: "", rank_name: "Kingdom", vernacular_name: "Archaea",   id: 935939},
];

function updateLeftBreadcrumb(rank_name, name) {
  $("#Left-category").text(rank_name);
  $("#Left-name").text(name);
}

function addToBreadcrumbPopover(rank_name, name, tsn) {
  //$("div", )
}

var searchState = "all";
function changeSearchState(){
    if(searchState=="parent"){
        document.getElementById("search-state").innerHTML='&#9680';
    }
    else if(searchState=="child"){
        document.getElementById("search-state").innerHTML='&#9681';
    }
    else{
        document.getElementById("search-state").innerHTML='&#9679';
    }
}
changeSearchState();
function searchAll(){
    searchState="all";
    changeSearchState();
}
function searchParent(){
    searchState="parent";
    changeSearchState();
}
function searchChild(){
    searchState="child";
    changeSearchState();
}


// Adds each individual item on the list
// Includes:
//  image
//  name
//  time
function addItemToList(dp, $center_list, listSize){
    // Creates a variable for the row
    var $cli_table_row = $("<tr>", {class:"center-list-item"});
    if (listSize < 3) {
        $cli_table_row.height($("#container-1").height()/3);
    }
    else if(listSize < 7){
        $cli_table_row.height($("#container-1").height()/listSize);
    }
    else {
        $cli_table_row.height($("#container-1").height()/7);
    }


    // Creating the image div with its height and width
    var $cli_image = $("<div>", {class: "circle center-list-image"});
    $cli_image.height($cli_table_row.height()-$cli_table_row.height()*.1);
    $cli_image.width($cli_table_row.height()-$cli_table_row.height()*.1);

    // Creating the table data to append the image to in order to put in the table
    var $cli_image_td = $("<td>", {class: "table-child"});
    $cli_image_td.width($cli_table_row.height());
    $cli_image_td.append($cli_image);

    // Adding the list data for labeling images
    var $cli_div_list = $("<ul>", {class:"center-list-list"});

    var $cli_name = $("<li>", {class : "item-name"});
    $cli_name.append(dp.name);

    var $cli_id = $("<li>",{class:"hidden tsn"});
    $cli_id.append(dp.id);

    var $cli_rank_name = $("<li>", {class:"hidden rank-name"});
    $cli_rank_name.append(dp.rank_name);

    var $cli_vernacular = $("<li>", {class : "item-vernacular"});
    $cli_vernacular.append(dp.vernacular_name);

    var $cli_more = $("<li>", {class: "item-time"});
    $cli_more.append("More...");

    if(listSize < 8){
        $cli_name.css(      "font-size", 20 + $cli_table_row.height()/30);
        $cli_vernacular.css("font-size", 18 + $cli_table_row.height()/20);
        $cli_more.css(      "font-size", 18 + $cli_table_row.height()/15);

    }

    $cli_div_list.append($cli_name);
    $cli_div_list.append($cli_id);
    $cli_div_list.append($cli_rank_name);
    $cli_div_list.append($cli_vernacular);
    $cli_div_list.append($cli_more);

    //Creating table data to append the list data to
    var $cli_list_td= $("<td>",{class:"table-child"});
    $cli_list_td.append($cli_div_list);

    //Appending data to the table row
    $cli_table_row.append($cli_image_td);
    $cli_table_row.append($cli_list_td);

    $center_list.append($cli_table_row);

}
function createTopBottomFade($center_list, $container, listSize){
    if(listSize> 8){
        var $fade_top = $("<div>", {class:"fade-top"});
        $fade_top.width( $container.width());
        $fade_top.offset($container.position());
        $center_list.append($fade_top);
        var $fade_bottom= $("<div>", {class:"fade-bottom"});
        $fade_bottom.width( $container.width());
        var $offset_pos = $container.position();
        $offset_pos.top = $offset_pos.top + $container.height()- 50;
        $fade_bottom.offset($offset_pos);
        $center_list.append($fade_bottom);
    }

}

// Wrapper function to fill in the left list
function fillLeftList(data) {
    var $center_list = $("#left-list");
    var $footer = 20;
    var $header = 100;
    $("#container-1").height((window).screen.height- $footer-$header);
    $center_list.height($("#container-1").height());

    for (var obj in data){
        var dp = data[obj];

        addItemToList(dp, $center_list, data.length);
    }
    createTopBottomFade($center_list, $("#container-1"), data.length);
    $center_list.width($(document).width() * .4);
}

// Wrapper function to fill in the right list
function fillRightList(data) {
    var $center_list = $("#right-list");
    var $footer = 20;
    var $header = 100;
    $("#container-2").height((window).screen.height- $footer-$header);
    $center_list.height($("#container-2").height());

    for (var obj in data){
        var dp = data[obj];

        addItemToList(dp, $center_list, data.length);
    }
    createTopBottomFade($center_list, $("#container-2"), data.length);
    $center_list.width($(document).width()*.4);
}


//Function will empty the entire list
// Will also put animations before clearing the list
function clearList($center_list){
    $center_list.empty();
}

function showInfoPanel(name) {
  clearList($("#right-list"));
  $("#right-list").append($(
    '<webview id="infoview" src="http://google.com/#q='+name+'" style="display:block; width:100%; height:100%"></webview>'
  ));
}

function killClicksLeft(){
  $("#left-list").find("tr").unbind("click");
}
function changeBCList(rank_name, name, tsn){
  $lastElement = $("#bc-list").find(".bcli").last();
  $lastElement.find(".bcl-name").text(name);
  $lastElement.find(".bcl-rname").text(rank_name);
  $lastElement.find(".tsn").text(tsn);
  updateLeftBreadcrumb(rank_name, name);
}

function setClicksLeft(){
    $("#left-list").find("tr").click(function(){
        var ul = $(this).find("td:nth-child(2)");
        var rname = ul.find(".rank-name").text();
        var name = ul.find(".item-name").text();
        var tsn = ul.find(".tsn").text();
        changeBCList(rname, name, tsn);
// Fill data function that uses getChildren to fill in the data on the left list or the right list
        getChildren(parseInt(ul.find(".tsn").text()), function(children){
          if (children.length == 0) {
            showInfoPanel(rname);
          } else {
            clearList($("#right-list"));
            fillRightList(children);
            setClicksRight();
          }
        });
    });
}

function fillFromBreadcrumbs(TSN){
  //click a breadcrumb, get TSN
  withParent(TSN, function(parent){
    getChildren(parent, function(children){
      // 'children' now refers to the siblings
      clearList($("#left-list"));
      fillLeftList(children);
      setClicksLeft();
    });
  });
  getChildren(TSN, function(children){
    clearList($("#right-list"));
    fillRightList(children);
    setClicksRight();
  })
}

function appendToBCList(rank_name, name, tsn){
  var $bc_item = $("<li>", {class:"bcli"});
  var $bc_list = $("<ul>", {class:"bcl"});
  var $bc_name = $("<li>", {class:"bcl-item bcl-name"});
  $bc_name.append(name);
  var $bc_rank_name = $("<li>", {class:"bcl-item bcl-rname"});
  $bc_rank_name.append(rank_name);
  var $bc_tsn = $("<li>", {class:"hidden tsn"});
  $bc_tsn.append(tsn);

  $bc_list.append($bc_rank_name);
  $bc_list.append($bc_name);
  $bc_list.append($bc_tsn);

  $bc_item.append($bc_list);

  $("#bc-list").append($bc_item);
  updateLeftBreadcrumb(rank_name, name);
}
// Function sets what will happen when you click a value on the given table id
function setClicksRight(){
    $("#right-list").find("tr").click(function(){
        var ul = $(this).find("td:nth-child(2)");
        var rname = ul.find(".rank-name").text();
        var name = ul.find(".item-name").text();
        var tsn = ul.find(".tsn").text();

// Fill data function that uses getChildren to fill in the data on the left list or the right list
        getChildren(parseInt(ul.find(".tsn").text()), function(children){
          appendToBCList(rname, name, tsn);
          clearList($("#left-list"));
          $("#left-list").append($("#right-list").children());
          killClicksLeft();

          $("#left-list").find(".fade-top").remove();
          $("#left-list").find(".fade-bottom").remove();
          createTopBottomFade($("#left-list"), $("#container-1"), 10);

          setClicksLeft();

          if (children.length == 0) {
            showInfoPanel(name);
          } else {
            clearList($("#right-list"));
            fillRightList(children);
            setClicksRight();
          }
        });
    });
}

$(document).ready(function(){
  // Data to fill in for the left list

  fillLeftList(KingdomsData);
  setClicksLeft();

  $("#left-list").find("tr")[0].click();
});
$(document).click(function(){
    $("#bc-list").find(".bcl").click(function(){
        var tsnValue = parseInt($(this).find(".tsn").text());
        fillFromBreadcrumbs(tsnValue);
    });
});

'use strict';
const superagent = require('superagent');

(function(){
    console.log("jquery and superagent is loaded!");
})();
