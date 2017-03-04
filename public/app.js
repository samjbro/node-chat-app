function getName() {
  var name = window.names[Math.floor(Math.random() * window.names.length)];
  var tokens = name.split(',');

  if (tokens.length > 1) {
    return askForName($.trim(tokens[1]) + ' ' + $.trim(tokens[0]));
  }

  return name;
}

function askForName(s) {
  var person = prompt("Please enter your name", s);
  if(person != null) {
    return person;
  }
  return s;
}

function escaped(data) {
  return $('<div></div>').html(data).html();
}

var name = getName();

$('#data').attr('placeholder', 'send message as ' + name);

var socket = io.connect('/');

socket.on('connect', () => {
  socket.emit('adduser', name);
});

socket.on('updatechat', (username, data) => {
  $('#conversation').append('<b>' + escaped(username) + ':</b> ' + escaped(data) + '<br/>')
});

socket.on('updateusers', (data)=> {
  console.log(data);
  $('#users').empty();
  $.each(data, (key,value) => {
    $('#users').append('<div>' + key + '</div>');
  });
});

socket.on('servernotification', (data) => {
  if(data.connected){
    if(data.toSelf) data.username = 'you';
    $('#conversation').append('connected: ' + escaped(data.username) + '<br/>');
  } else {
    $('#conversation').append('disconnected: ' + escaped(data.username) + '<br/>');
  }
});

$(function() {
  $('#data').keypress(function (e) {
    if (e.which == 13) {
      var message = $('#data').val();
      $('#data').val('');

      socket.emit('sendchat', message);
    }
  });
});
