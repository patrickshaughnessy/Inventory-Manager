'use strict';

$(document).ready(init);

function init(){

  $('li>a.btn').on('click', goToRoom);
  $('#addRoom').click(addRoom);
  $('#addItem').click(addItem);

}

function addItem(){
  var newItem = {};
  newItem.name = $('#newItemName').val();
  newItem.description = $('#newItemDescription').val();
  newItem.value = $('#newItemValue').val();

  $.post('/items', newItem)
    .done(function(id){
      console.log('id', id);
      var $name = $('<h1>').text(newItem.name);
      var $description = $('<h2>').text(newItem.description)
      var $price = $('<h3>').text('$'+newItem.value.toString());
      var $item = $('<div>').addClass('col-xs-12 item')
                            .data('mongoid', id)
                            .append($name, $description, $price);
      $('#unassignedItems').append($item);
    }).fail(function(err){
      console.error(err);
    });
}

function addRoom(){
  var newRoomName = $('#newRoomName').val();
  $.post('/rooms', {name: newRoomName})
    .done(function(data){
      console.log(data);
      var $newRoom = $('<li>').attr('role', 'presentation')
                              .append($('<a>').addClass('btn btn-primary btn-lg roomButton').data('mongoid', data).text(newRoomName));
      $('#roomsArea').append($newRoom);
    }).fail(function(err){
      console.error(err);
    });
}

function goToRoom(event){
  var roomId = '/downstairs/' + $(this).data('mongoid');
  $.get(roomId)
    .done(function(data){
      showItems(data);
    }).fail(function(err){
      console.error(err);
    });
}

function showItems(room){
  $('#itemsArea').empty();
  // console.log(room);
  var $items = $('<div>').addClass('col-xs-6 item');
  room.items.forEach(function(item){
    console.log(item)
    var $name = $('<h1>').text(item.name);
    var $description = $('<h2>').text(item.description)
    var $price = $('<h3>').text('$'+item.value.toString());
    var $item = $('<div>').append($name, $description, $price);
    $items.append($item);
  });
  $('#itemsArea').append($items);
}
