global.jQuery = require('jQuery');
const $ = require('jQuery');
const bootstrap=require('bootstrap');
$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        delay:{hide:"100"},
            content: "<p>Dummy Text</p>",
            html:true,
    });   
});
function changeBreadcrumbContent(parentCategory,parentName,childCategory,childName){
    Document.getElementById('Kingdom-category').innerHTML=parentCategory;
    Document.getElementById('Kingdom-name').innerHTML=parentName;
    Document.getElementById('Phylum-category').innerHTML=childCategory;
    Document.getElementById('Phylum-name').innerHTML=childName;
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


