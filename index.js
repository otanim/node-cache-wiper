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

let colorParamsGenerate = function (index) {
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
    return colorReservationList[countOfReservedColors - 1].indent + 1;
  } else if (destination == 'end') {
    let indexOfOldSibling = getIndexOfOldSibling(command);
    let sibling = colorReservation[indexOfOldSibling];
    if (sibling) {
      return sibling.indent;
    }
  }

  return colorReservationList[countOfReservedColors - 1].indent;
};

console.llog = module.exports = function (command, destination) {
  let env = process.env.NODE_ENV;
  if (env != 'testing') {
    return;
  }

  let color;
  let indents;
  let indent = getLastIndentIndex(colorReservation, command, destination);
  if (!isScopeOpened(command, indent)) {
    let countOfReservedColors = colorReservation.length;
    color = colorParamsGenerate(countOfReservedColors);
  } else {
    let indexOfOldSibling = getIndexOfOldSibling(command);
    colorReservation[indexOfOldSibling].isClosed = true;

    let sibling = colorReservation[indexOfOldSibling];

    color = sibling.colors;
  }

  indents = generate.indents(indent);
  colorReservation.push({
    command: command,
    colors: color,
    indent: indent,
    destination: destination
  });

  let text = indents + colors[color](command);

  console.log(text);
};