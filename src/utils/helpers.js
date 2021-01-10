import {
  VALID_TYPED_KEYS,
  NEWLINE_LENGTH,
  BOUNDARY_OFFSET
} from './constants';

export const isTypeable = key => {
  return VALID_TYPED_KEYS.includes(key);
}

export const isDeleteKey = key => {
  return key === 'Backspace';
}

export const getCharGridIndexAtCursor = ({ cursor, boundaries }) => {
  return cursor.x + cursor.y * (boundaries.x + NEWLINE_LENGTH + BOUNDARY_OFFSET);
}

const getPaddedRow = ({ charRow, targetRowLength }) => {
  let output = charRow;
  const padding = targetRowLength - charRow.length;

  for (var i = 0; i < padding; i++) {
    output += ' ';
  }

  return output;
}

const getProcessedRows = ({ charRows, targetRowLength }) => {
  const output = [];

  charRows.forEach(charRow => {
    if (charRow.length < targetRowLength) {
      output.push(getPaddedRow({ charRow, targetRowLength }));
    } else {
      output.push(charRow);
    }
  });

  return output;
}

const getMaxRowLength = ({ charRows }) => {
  let output = 0;

  charRows.forEach(charRow => {
    if (charRow.length > output) {
      output = charRow.length;
    }
  });

  return output;
}

export const getUpdatedCharGrid = ({ charGrid, key, updateIndex, insert }) => {
  let processedRows;

  if (insert) {
    const CHAR_REMOVAL_COUNT = 0;

    const charGridBuffer = charGrid.split('');
    charGridBuffer.splice(updateIndex, CHAR_REMOVAL_COUNT, key);
    const charRows = charGridBuffer.join('').split('\n');

    const targetRowLength = getMaxRowLength({ charRows });

    processedRows = getProcessedRows({ charRows, targetRowLength });
  } else {
    const CHAR_REMOVAL_COUNT = 1;

    const charGridBuffer = charGrid.split('');
    charGridBuffer.splice(updateIndex, CHAR_REMOVAL_COUNT);
    const charRows = charGridBuffer.join('').split('\n');

    const targetRowLength = getMaxRowLength({ charRows });

    processedRows = getProcessedRows({ charRows, targetRowLength });
  }

  return processedRows.join('\n');
}