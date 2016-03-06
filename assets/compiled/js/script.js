const $ = require('jQuery');

// Adds each individual item on the list 
// Includes:
//  image
//  name
//  time
function addItemToList(dp, $center_list, listSize){
    // Creates a variable for the row
    var $cli_table_row = $("<tr>", {class:"center-list-item"});
    if (listSize < 8) {
        $cli_table_row.height($center_list.height()/listSize);
    }else {
        $cli_table_row.height(85);
    }

    // Creating the image div with its height and width
    var $cli_image = $("<div>", {class: "circle center-list-image"});
    $cli_image.height($cli_table_row.height()-$cli_table_row.height()*.1);
    $cli_image.width($cli_table_row.height()-$cli_table_row.height()*.1);

    // Creating the table data to append the image to in order to put in the table
    var $cli_image_td = $("<td>", {class: "table-child"});
    $cli_image_td.append($cli_image);

    // Adding the list data for labeling images
    var $cli_div_list = $("<ul>", {class:"center-list-list"});

    var $cli_name = $("<li>", {class : "item-name"});
    $cli_name.append(dp.name);
    
    var $cli_time = $("<li>", {class : "item-time"});
    $cli_time.append(dp.time);
    
    var $cli_more = $("<li>", {class: "item-time"});
    $cli_more.append("More...");

    $cli_div_list.append($cli_name);
    $cli_div_list.append($cli_time);
    $cli_div_list.append($cli_more);

    //Creating table data to append the list data to
    var $cli_list_td= $("<td>",{class:"table-child"});
    $cli_list_td.append($cli_div_list);

    //Appending data to the table row
    $cli_table_row.append($cli_image_td);
    $cli_table_row.append($cli_list_td);

    $center_list.append($cli_table_row);

}
// Wrapper function to fill in the left list
function fillLeftList(data) {
    var $center_list = $("#center-list");
    var $footer = 20;
    var $header = 100;
    $("#container-1").height((window).screen.height- $footer-$header);

    for (var obj in data){
        var dp = data[obj];

        addItemToList(dp, $center_list, data.length);
    }
    $center_list.width($(document).width()*.4);
}
// Wrapper function to fill in the right list
function fillRightList(data) {
    var $center_list = $("#center-list-2");
    var $footer = 20;
    var $header = 100;
    $("#container-2").height((window).screen.height- $footer-$header);
    $center_list.height($("#container-2").height());

    for (var obj in data){
        var dp = data[obj];

        addItemToList(dp, $center_list, data.length);
        console.log(data.length);
    }
    $center_list.width($(document).width()*.4);
}
// Class to hold data of name time and description
// Can add more variables later when needed
function dataObj (_name, _time, _description) {
    this.name = _name;
    this.time = _time;
    this.description = _description;
}
// Data to fill in for the left list
var data = [];
for(var i = 0; i < 100; i++){
    var kingdom = new dataObj("Kingdom Name ", "Time Period", "Description");
    data.push(kingdom);       
}
// Data to fill in for the right list
var data2 = [];
for(var i = 0; i < 7; i++){
    var domain = new dataObj("Domain Name", "Time Period", "Description");
    data2.push(domain);
}
fillLeftList(data);
fillRightList(data2);

'use strict';
const superagent = require('superagent');

(function(){
    console.log($);
    console.log(superagent);
    console.log("jquery and superagent is loaded!");
})();
