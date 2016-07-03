let colors = require('colors');

let colorReservation = [];

let generate = {
  indent: function () {
    let space = ' ';
    let spaces = '';

    for (let i = 0; i < 4; i++) {
      spaces += space;
    }

    return spaces;
  },
  indents: function (levels) {
    let indent = generate.indent();
    let indents = '';
    for (let i = 0; i < levels; i++) {
      indents += indent;
    }

    return indents;
  },

  color: function (index) {
    const colorList = [
      'white',
      'green',
      'yellow',
      'gray',
      'magenta',
      'cyan',
      'red'
    ];

    let countOfColors = colorList.length;


    let indexOfColor =
      index < countOfColors ?
        index :
      index % countOfColors;

    return colorList[indexOfColor]
  }
};

let isScopeOpened = function (command, indent) {
  for (var i = colorReservation.length - 1; i >= 0; i--) {
    if (colorReservation[i].command == command && colorReservation[i].destination == 'begin' && colorReservation[i].indent == indent && colorReservation[i].isClosed != true) {
      return true;
    }
  }

  return false;
};

let getIndexOfOldSibling = function (command) {
  for (var i = colorReservation.length - 1; i >= 0; i--) {
    if (colorReservation[i].command == command && colorReservation[i].destination == 'begin' && !colorReservation[i].isClosed) {
      return i;
    }
  }

  return false;
};

let getLastIndentIndex = function (colorReservationList, command, destination) {
  let countOfReservedColors = colorReservation.length;
  if (countOfReservedColors == 0) {
    return 0;
  }

  if (destination == 'begin') {
    for (var i = colorReservation.length - 1; i >= 0; i--) {
      if (colorReservationList[i].destination && !colorReservationList[i].isClosed) {
        break;
      }
    }
    if (i != -1) {
      return colorReservationList[i].indent + 1;
    }

    return colorReservationList[countOfReservedColors - 1].indent;
  } else if (destination == 'end') {
    let indexOfOldSibling = getIndexOfOldSibling(command);
    let sibling = colorReservation[indexOfOldSibling];
    if (sibling) {
      return sibling.indent;
    }
  }

  if (colorReservationList[countOfReservedColors - 1].destination == 'begin') {
    return colorReservationList[countOfReservedColors - 1].indent + 1;
  }

  return colorReservationList[countOfReservedColors - 1].indent;
};

console.llog = exports.log = function (command, destination) {
  let env = process.env.NODE_ENV;
  if (env != 'testing') {
    return;
  }

  let color;
  let indents;
  let isClosed = false;
  let indent = getLastIndentIndex(colorReservation, command, destination);
  if (!isScopeOpened(command, indent)) {
    let countOfReservedColors = colorReservation.length;
    color = generate.color(countOfReservedColors);
  } else {
    let indexOfOldSibling = getIndexOfOldSibling(command);
    colorReservation[indexOfOldSibling].isClosed = true;
    isClosed = true;
    let sibling = colorReservation[indexOfOldSibling];

    color = sibling.colors;
  }

  indents = generate.indents(indent);
  colorReservation.push({
    command: command,
    colors: color,
    indent: indent,
    destination: destination,
    isClosed: isClosed
  });

  let text = indents + colors[color](command);

  console.log(text);
};

exports.init = function () {
  colorReservation = [];
};


process.env.NODE_ENV = 'testing';