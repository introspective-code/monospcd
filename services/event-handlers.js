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

export const handleTypeableKey = ({ key }) => {
  const updatedCharGrid = insertInCharGrid({ key });

  setCharGrid(updatedCharGrid);

  setCursor({
    x: getCursor().x + 1
  });

  renderCharGrid();
}

export const handleDeleteKey = ({ key }) => {
  const cursor = getCursor();
  const boundaries = getBoundaries();

  if (cursor.x === 0 && cursor.y === 0) {

  } else if (cursor.x === 0 && cursor.y > 0) {
    setCursor({
      y: cursor.y - 1,
      x: boundaries.x
    });
  } else {
    const updatedCharGrid = removeInCharGrid({ key });

    setCharGrid(updatedCharGrid);

    setCursor({
      x: getCursor().x - 1
    });

    renderCharGrid();
  }
}

export const handleEnterKey = ({ key }) => {
  const cursor = getCursor();
  const boundaries = getBoundaries();

  const updatedCharGrid = insertInCharGrid({ key });

  setCharGrid(updatedCharGrid);

  setCursor({
    x: 0,
    y: cursor.y + 1
  });

  renderCharGrid();
}

export const handleArrowKey = ({ key }) => {
  const cursor = getCursor();
  const boundaries = getBoundaries();

  if (key === 'ArrowUp' && cursor.y > 0) {
    setCursor({ y: cursor.y - 1 });
  }
  if (key === 'ArrowDown' && cursor.y < boundaries.y) {
    setCursor({ y: cursor.y + 1 });
  }
  if (key === 'ArrowLeft' && cursor.x > 0) {
    setCursor({ x: cursor.x - 1 });
  }
  if (key === 'ArrowRight' && cursor.x < boundaries.x) {
    setCursor({ x: cursor.x + 1 });
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
