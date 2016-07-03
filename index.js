let _ = require('lodash');
let colors = require('colors');

let colorReservation = [];

let isScopeOpened = function (command) {
  let countOfElements = 0;

  for (let i = 0; i < colorReservation.length; i++) {
    if (colorReservation[i].command == command) {
      countOfElements++;
    }
  }

  return countOfElements % 2 == 1;
};

let indentGenerate = function () {
  let space = ' ';
  let spaces = '';

  for (let i = 0; i < 4; i++) {
    spaces += space;
  }

  return spaces;
};
let indentsGenerate = function (levels) {
  let indent = indentGenerate();
  let indents = '';
  for (let i = 0; i < levels; i++) {
    indents += indent;
  }

  return indents;
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
let oldSibling = function (command) {
  let listOfReservedTexts = _.map(colorReservation, 'command');
  let indexOfLastResult = listOfReservedTexts.lastIndexOf(command);

  if (indexOfLastResult != -1) {
    return colorReservation[indexOfLastResult];
  }

  return false;
};

let getLastIndentIndex = function (colorReservationList, command, isSingle) {
  let countOfReservedColors = colorReservation.length;
  if (countOfReservedColors == 0) {
    return 0;
  }

  if (isSingle) {
    return colorReservationList[countOfReservedColors - 1].indent;
  }

  let sibling = oldSibling(command);
  if (sibling) {
    return sibling.indent;
  }

  return colorReservationList[countOfReservedColors - 1].indent + 1;
};

console.llog = function (command, isSingle) {
  let env = process.env.NODE_ENV;
  if (env != 'testing') {
    return;
  }

  let color;
  let indents;
  if (!isScopeOpened(command)) {
    let countOfReservedColors = colorReservation.length;
    color = colorParamsGenerate(countOfReservedColors);
  } else {
    let sibling = oldSibling(command);
    color = sibling.colors;
  }

  let indentParam = getLastIndentIndex(colorReservation, command, isSingle);
  indents = indentsGenerate(indentParam);
  colorReservation.push({
    command: command,
    colors: color,
    indent: indentParam
  });

  let text = indents + colors[color](command);

  console.log(text);
};