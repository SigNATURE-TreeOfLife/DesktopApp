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
    $cli_image_td.width($cli_table_row.height());
    $cli_image_td.append($cli_image);

    // Adding the list data for labeling images
    var $cli_div_list = $("<ul>", {class:"center-list-list"});

    var $cli_name = $("<li>", {class : "item-name"});
    $cli_name.append(dp.name);

    var $cli_id = $("<li>",{class:"hidden"});
    $cli_id.append(dp.id); 

    var $cli_time = $("<li>", {class : "item-time"});
    $cli_time.append(dp.time);
    
    var $cli_more = $("<li>", {class: "item-time"});
    $cli_more.append("More...");

    if(listSize < 8){
        $cli_name.css("font-size", 20 + $cli_table_row.height() / 30);
        $cli_time.css("font-size", 18 + $cli_table_row.height()/30);
        $cli_more.css("font-size", 18 + $cli_table_row.height()/30);

    }

    $cli_div_list.append($cli_name);
    $cli_div_list.append($cli_id);
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
    var $center_list = $("#center-list");
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
    createTopBottomFade($center_list, $("#container-2"), data.length);
    $center_list.width($(document).width()*.4);
}
// Class to hold data of name time and description
// Can add more variables later when needed
function dataObj (_name, _time, _description, _id) {
    this.name = _name;
    this.time = _time;
    this.description = _description;
    this.id = _id;
}
// Data to fill in for the left list
var data = [];
for(var i = 0; i < 9; i++){
    var kingdom = new dataObj("Kingdom Name ", "Time Period", "Description", i);
    data.push(kingdom);       
}
// Data to fill in for the right list
var data2 = [];
for(var i = 0; i < 9; i++){
    var domain = new dataObj("Domain Name", "Time Period", "Description", i);
    data2.push(domain);
}

//Function will empty the entire list 
// Will also put animations before clearing the list
function clearList($center_list){
    $center_list.empty();    
}
// TODO: Fill in this method for querying the database
function getChildren(id) {
    var data2 = [];
    for(var i = 0; i < 9; i++){
        var domain = new dataObj("Domain Name", "Time Period", "Description", i);
        data2.push(domain);
    }
    return data2;
}


function setClicksLeft(){
    $("#center-list-1").find("tr").click(function(){
        var ul = $(this).find("td:nth-child(2)");
// Fill data function that uses getChildren to fill in the data on the left list or the right list
        var children = getChildren(parseInt(ul.find(".hidden").text()));
        clearList($("#center-list-2"));
        fillRightList(children);
        setClicksRight();
    });
}
// Function sets what will happen when you click a value on the given table id
function setClicksRight(){
    $("#center-list-2").find("tr").click(function(){
        var ul = $(this).find("td:nth-child(2)");
// Fill data function that uses getChildren to fill in the data on the left list or the right list
        var children = getChildren(parseInt(ul.find(".hidden").text()));
        console.log(ul.find(".hidden").text());
        clearList($("#center-list"));

        $("#center-list").append($("#center-list-2").children());
        $("#center-list").find(".fade-top").remove();
        $("#center-list").find(".fade-bottom").remove();
        createTopBottomFade($("#center-list"), $("#container-1"), 10);
        clearList($("#center-list-2"));
        fillRightList(children);

        setClicksLeft();
        setClicksRight();
    });
}
function fillContent(data1, data2){
    fillLeftList(data);
    fillRightList(data2);
    setClicksLeft();
    setClicksRight();
}
fillContent(data, data2);
