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

export const getUpdatedCharGrid = ({ charGrid, key, updateIndex }) => {
  const CHAR_REMOVAL_COUNT = 1;
  const output = charGrid.split('');

  output.splice(updateIndex, CHAR_REMOVAL_COUNT, key);

  return output.join('');
}