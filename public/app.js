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

var name = getName();

$('#data').attr('placeholder', 'send message as ' + name);

var socket = io.connect('/');

socket.on('updatechat', (data) => {
  // $('#conversation').append('<b>' + data + '</b>')
  $('#conversation').append('<b>' + 'yooo' + '</b>')
});

$(function() {
  $('#data').keypress(function (e) {
    if (e.which == 13) {
      var message = $('#data').val();
      socket.emit('sendchat', message);
    }
  });
});
