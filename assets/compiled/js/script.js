global.jQuery = require('jQuery');
const $ = require('jQuery');
const bootstrap=require('bootstrap');
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});

'use strict';
const superagent = require('superagent');

(function(){
    console.log("jquery and superagent is loaded!");
})();
