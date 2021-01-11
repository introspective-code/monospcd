import {
  VALID_TYPED_KEYS,
  NEWLINE_LENGTH,
  BOUNDARY_OFFSET,
  STANDARD_ROW_LENGTH
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

export const getCharGridIndexAtCursor = () => {
  const cursor = getCursor();
  const boundaries = getBoundaries();
  return cursor.x + cursor.y * (boundaries.x + NEWLINE_LENGTH + BOUNDARY_OFFSET);
}

export const getPaddedRow = ({ charRow }) => {
  let output = charRow;
  output = output.trimEnd();

  const padding = STANDARD_ROW_LENGTH - output.length;

  for (var i = 0; i < padding; i++) {
    output += ' ';
  }

  return output;
}

export const getProcessedRows = ({ charRows }) => {
  const output = [];

  charRows.forEach(charRow => {
    output.push(getPaddedRow({ charRow }));
  });

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

export const insertInCharGrid = ({ key }) => {
  const charGrid = getCharGrid();
  const updateIndex = getCharGridIndexAtCursor();

  const CHAR_REMOVAL_COUNT = 0;

  const charGridBuffer = charGrid.split('');
  charGridBuffer.splice(updateIndex, CHAR_REMOVAL_COUNT, key);
  const charRows = charGridBuffer.join('').split('\n');

  return getProcessedRows({ charRows }).join('\n');
}

export const removeInCharGrid = ({ key }) => {
  const charGrid = getCharGrid();
  const updateIndex = getCharGridIndexAtCursor();

  const CHAR_REMOVAL_COUNT = 1;
  const indexOffset = 1;

  const charGridBuffer = charGrid.split('');
  charGridBuffer.splice(updateIndex - indexOffset, CHAR_REMOVAL_COUNT);
  const charRows = charGridBuffer.join('').split('\n');

  return getProcessedRows({ charRows }).join('\n');
}