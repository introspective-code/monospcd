import { buildGrid } from '../utils/helpers';
import {
  ROW_COUNT,
  COL_COUNT
} from '../utils/constants';

let charGrid = buildGrid({
  cols: COL_COUNT,
  rows: ROW_COUNT
});

let cursor = {
  x: 0,
  y: 0
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
    x: charGrid.split('\n')[0].length - 1,
    y: charGrid.split('\n').length - 1
  });
}