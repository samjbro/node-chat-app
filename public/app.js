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
