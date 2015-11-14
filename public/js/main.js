'use strict';

$(document).ready(init);

function init(){

  $('li>.btn').on('click', goToRoom);
  $('#addRoom').click(addRoom);
  $('#addItem').click(addItem);
  $('#unassignedItems').on('click', '.item', selectItem);
  $('#itemsArea').on('click', '.item', selectItem);
  $('#delete').on('click', deleteItems);

}

function deleteItems(){
  var clickedId = $('.highlight').data('mongoid');
  console.log('here', clickedId)
  $.ajax('/items', {
    method: "DELETE",
    data: {clickedId: clickedId},
    success: function(id){
      $('.highlight').remove();
    }
  })
}

function moveItemsToRoom(roomId){
  var clickedIds = [];

  if ($('.highlight').length === 1){
    clickedIds.push($('.highlight').data('mongoid'));
  } else {
    $('.highlight').each(function(i, elem){
      clickedIds.push(elem.dataset.mongoid);
    });
  }

  console.log(clickedIds);

  $.ajax('/rooms', {
    method: 'PUT',
    data: {
      roomId: roomId,
      clickedIds: clickedIds
    },
    success: function(itemId){
      console.log(itemId);
      $('.highlight').remove();

    }
  });
}

function selectItem(event){
  $('.highlight').removeClass('highlight');
  $(this).toggleClass('highlight');
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
  var roomId = $(this).data('mongoid');
  var roomURL = '/downstairs/' + $(this).data('mongoid');
  console.log(roomURL);
  $.get(roomURL)
    .done(function(data){
      if ($('.highlight').length){
        moveItemsToRoom(roomId);
        showItems(data);
      }
      showItems(data);
    }).fail(function(err){
      console.error(err);
    });
}

function showItems(room){
  $('#itemsArea').empty();
  var $items = $('<div>').addClass("row");
  room.items.forEach(function(item){
    console.log(item)
    var $name = $('<h1>').text(item.name);
    var $description = $('<h2>').text(item.description)
    var $price = $('<h3>').text('$'+item.value.toString());
    var $item = $('<div>').addClass('col-xs-5 item').data('mongoid', item._id).append($name, $description, $price);
    $items.append($item);
  });
  $('#itemsArea').append($items);
}
