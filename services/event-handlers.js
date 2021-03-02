import {
  getCharGrid,
  getCursor,
  getBoundaries,
  setCharGrid,
  setCursor,
} from '../services/globals';

import {
  renderCursor,
  renderCharGrid
} from '../services/render';

import {
  isTypeableKey,
  isDeleteKey,
  isArrowKey,
  isEnterKey,
  insertInCharGrid,
  removeInCharGrid
} from '../utils/helpers';

import {
  ONE,
  ZERO
} from '../utils/constants'

export const handleTypeableKey = ({ key }) => {
  const cursor = getCursor();
  const boundaries = getBoundaries();
  const isCursorXAtBoundary = cursor.x === boundaries.x;
  const isCursorYAtBoundary = cursor.y === boundaries.y;

  if (isCursorXAtBoundary && isCursorYAtBoundary) {

  } else {
    let updatedCharGrid;

    if (cursor.x === boundaries.x) {
      updatedCharGrid = insertInCharGrid({ key: 'Enter' });

      setCharGrid(updatedCharGrid);

      setCursor({
        x: ZERO,
        y: cursor.y + ONE
      });
    }

    updatedCharGrid = insertInCharGrid({ key });

    setCharGrid(updatedCharGrid);

    setCursor({
      x: getCursor().x + ONE
    });

    renderCharGrid();
  }
}

export const handleDeleteKey = ({ key }) => {
  const cursor = getCursor();
  const boundaries = getBoundaries();
  const isCursorXZero = cursor.x === ZERO;
  const isCursorYZero = cursor.y === ZERO;

  if (isCursorXZero && isCursorYZero) {

  } else if (isCursorXZero && cursor.y > ZERO) {
    setCursor({
      y: cursor.y - ONE,
      x: boundaries.x
    });
  } else {
    const updatedCharGrid = removeInCharGrid({ key });

    setCharGrid(updatedCharGrid);

    setCursor({
      x: getCursor().x - ONE
    });

    renderCharGrid();
  }
}

export const handleEnterKey = ({ key }) => {
  const cursor = getCursor();
  const boundaries = getBoundaries();

  if (cursor.y === boundaries.y) {

  } else {
    const updatedCharGrid = insertInCharGrid({ key });

    setCharGrid(updatedCharGrid);

    setCursor({
      x: ZERO,
      y: cursor.y + ONE
    });

    renderCharGrid();
  }
}

export const handleArrowKey = ({ key }) => {
  const cursor = getCursor();
  const boundaries = getBoundaries();

  if (key === 'ArrowUp' && cursor.y > ZERO) {
    setCursor({ y: cursor.y - ONE });
  }
  if (key === 'ArrowDown' && cursor.y < boundaries.y) {
    setCursor({ y: cursor.y + ONE });
  }
  if (key === 'ArrowLeft' && cursor.x > ZERO) {
    setCursor({ x: cursor.x - ONE });
  }
  if (key === 'ArrowRight' && cursor.x < boundaries.x) {
    setCursor({ x: cursor.x + ONE });
  }
}

export const handleDocumentKeyDown = event => {
  if (isTypeableKey(event.key)) {
    handleTypeableKey(event);
  }

  if (isDeleteKey(event.key)) {
    handleDeleteKey(event);
  }

  if (isEnterKey(event.key)) {
    handleEnterKey(event);
  }

  if (isArrowKey(event.key)) {
    handleArrowKey(event);
  }

  renderCursor();
}
