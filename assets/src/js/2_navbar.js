
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
    {name: "Bacteria",  time: "", description: "", id: 50},
    {name: "Protozoa",  time: "", description: "", id: 630577},
    {name: "Plantae",   time: "", description: "", id: 202422},
    {name: "Animalia",  time: "", description: "", id: 202423},
    {name: "Fungi",     time: "", description: "", id: 555705},
    {name: "Chromista", time: "", description: "", id: 630578},
    {name: "Archaea",   time: "", description: "", id: 935939},
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
