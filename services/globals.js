import { buildGrid } from '../utils/helpers';
import {
  ROW_COUNT,
  COL_COUNT,
  ONE,
  ZERO,
  NEWLINE_CHAR
} from '../utils/constants';

let charGrid = buildGrid({
  cols: COL_COUNT,
  rows: ROW_COUNT
});

let cursor = {
  x: ZERO,
  y: ZERO
}

let boundaries = {
  x: COL_COUNT,
  y: ROW_COUNT
}

export const getCharGrid = () => charGrid;
export const getCursor = () => cursor;
export const getBoundaries = () => boundaries;

export const setCharGrid = input => {
  charGrid = input;
  updateBoundaries();
}

export const setCursor = input => {
  cursor = {
    ...cursor,
    ...input
  };
}

export const setBoundaries = input => {
  boundaries = {
    ...boundaries,
    ...input
  };
}

export const updateBoundaries = () => {
  setBoundaries({
    x: charGrid.split(NEWLINE_CHAR)[ZERO].length - ONE,
    y: charGrid.split(NEWLINE_CHAR).length - ONE
  });
}