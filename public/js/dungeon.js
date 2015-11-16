'use strict';

$(document).ready(init);

function init(){

  populateCells();
  cadeGreet();
}

function cadeGreet(){
  $('#greetCade').animate({
    left: "+=6%"
  }, 5000, "swing", function(){
    $('#greetCade').animate({
      top: "+=20%",
      left: "-=3%"
    }, 5000)
  })

  window.setTimeout(function(){
    $('.cade').animate({
      height: "+=160px",
      width: "+=160px"
    }, 5000)
  }, 5000)
}

function populateCells(){

  $.get('/dungeons/getcades')
  .done(function(cades){
    console.log(cades);
    cades.forEach(function(cade){
      var cellNum = Math.ceil(Math.random() * 4);
      var $cell = $(`.cell:nth-child(${cellNum})`);
      // var $label = $('<h1>').text(cade.description);
      var $image = $('<img>').addClass('slave').attr('src', cade.image)
      $cell.append($image);
      // debugger;
    })
  })

}
