import {
  VALID_TYPED_KEYS,
  NEWLINE_LENGTH,
  BOUNDARY_OFFSET
} from './constants';

export const isTypeable = key => {
  return VALID_TYPED_KEYS.includes(key);
}

export const getCharGridIndexAtCursor = ({ cursor, boundaries }) => {
  return cursor.x + cursor.y * (boundaries.x + NEWLINE_LENGTH + BOUNDARY_OFFSET);
}

const getPaddedRow = ({ charRow, targetLength }) => {
  let output = charRow;
  const padding = targetLength - charRow.length;

  for (var i = 0; i < padding; i++) {
    output += ' ';
  }

  return output;
}

export const getUpdatedCharGrid = ({ charGrid, key, updateIndex }) => {
  const CHAR_REMOVAL_COUNT = 0;

  const charGridBuffer = charGrid.split('');
  charGridBuffer.splice(updateIndex, CHAR_REMOVAL_COUNT, key);
  const charRows = charGridBuffer.join('').split('\n');

  let maxRowLength = 0;

  charRows.forEach(charRow => {
    if (charRow.length > maxRowLength) {
      maxRowLength = charRow.length;
    }
  });

  const processedRows = [];

  charRows.forEach(charRow => {
    if (charRow.length < maxRowLength) {
      processedRows.push(getPaddedRow({ charRow, targetLength: maxRowLength }));
    } else {
      processedRows.push(charRow);
    }
  });

  return processedRows.join('\n');
}