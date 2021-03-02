import {
  VALID_TYPED_KEYS,
  NEWLINE_LENGTH,
  BOUNDARY_OFFSET,
  COL_COUNT,
  ROW_COUNT,
  CHAR_REMOVAL_COUNT
} from './constants';

import {
  getCursor,
  getCharGrid,
  getBoundaries
} from '../services/globals';

export const isTypeableKey = key => {
  return VALID_TYPED_KEYS.includes(key);
}

export const isDeleteKey = key => {
  return key === 'Backspace';
}

export const isArrowKey = key => {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
}

export const isEnterKey = key => {
  return key === 'Enter';
}

export const getCharGridIndexAtCursor = () => {
  const cursor = getCursor();
  const boundaries = getBoundaries();

  return cursor.x + cursor.y * (boundaries.x + NEWLINE_LENGTH + BOUNDARY_OFFSET);
}

export const getPaddedRow = ({ charRow }) => {
  let output = charRow;
  output = output.trimEnd();

  const padding = COL_COUNT - output.length;

  for (var i = 0; i < padding; i++) {
    output += ' ';
  }

  return output;
}

export const getProcessedRows = ({ charRows }) => {
  let output = [];

  charRows.forEach(charRow => {
    output.push(getPaddedRow({ charRow }));
  });

  while (output.length > ROW_COUNT) {
    output.pop();
  }

  return output;
}

export const getMaxRowLength = ({ charRows }) => {
  let output = 0;

  charRows.forEach(charRow => {
    if (charRow.length > output) {
      output = charRow.length;
    }
  });

  return output;
}

export const getCharByKey = key => {
  if (key === 'Enter') {
    return '\n';
  }
  return key;
}

export const insertInCharGrid = ({ key }) => {
  const charGrid = getCharGrid();
  const updateIndex = getCharGridIndexAtCursor();

  const charGridBuffer = charGrid.split('');
  charGridBuffer.splice(updateIndex, CHAR_REMOVAL_COUNT, getCharByKey(key));
  const charRows = charGridBuffer.join('').split('\n');

  return getProcessedRows({ charRows }).join('\n');
}

export const removeInCharGrid = ({ key }) => {
  const charGrid = getCharGrid();
  const updateIndex = getCharGridIndexAtCursor();

  CHAR_REMOVAL_COUNT = 1;
  const indexOffset = 1;

  const charGridBuffer = charGrid.split('');
  charGridBuffer.splice(updateIndex - indexOffset, CHAR_REMOVAL_COUNT);
  const charRows = charGridBuffer.join('').split('\n');

  return getProcessedRows({ charRows }).join('\n');
}

export const buildGrid = ({ rows, cols }) => {
  let output = '';
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      output += ' ';
    }
    output += '\n';
  }

  return output.substring(0, output.length - 1);
}