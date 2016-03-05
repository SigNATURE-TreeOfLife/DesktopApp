const $ = require('jQuery');

function fillLeftList(data) {
    var $center_list = $("#center-list");
    var $footer = 20;
    var $header = 100;
    $center_list.height($(document).height()-$footer - $header);

    for (var obj in data){
        var dp = data[obj];

        var $cli = $("<li>", {class : "center-list-item"});
        $cli.height($("#center-list").height()/8);

        var $cli_div = $("<div>", {class : "center-list-div"});

        var $cli_image = $("<div>", {class: "circle center-list-image"});

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

        $cli_div.append($cli_image);
        $cli_div.append($cli_div_list);
        
        $cli.append($cli_div);
        

        $("#center-list").append($cli);
    }
    $center_list.width(250);
}
function dataObj (_name, _time, _description) {
    this.name = _name;
    this.time = _time;
    this.description = _description;
}
var data = [];
for(var i = 0; i < 100; i++){
    var kingdom = new dataObj("Kingdom Name ", "Time Period", "Description");
    data.push(kingdom);       
}
fillLeftList(data);
