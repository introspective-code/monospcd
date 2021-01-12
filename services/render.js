import {
  getCharElement,
  getNewlineElement
} from './dom-elements';

import {
  getCharGrid,
  getCursor
} from './globals';

export const renderRoot = () => {
  const rootNode = document.createElement('div');
  rootNode.setAttribute("id", "root");
  document.body.appendChild(rootNode);
}

export const renderCharGrid = () => {
  const charGrid = getCharGrid();

  let row = 0;
  let col = 0;

  const markup = charGrid.split('').map(character => {
    if (character === '\n') {
      row++;
      col = 0;
      return getNewlineElement();
    } else {
      return getCharElement({ col: col++, row, character });
    }
  }).join('');

  document.querySelector('#root').innerHTML = markup;
}

export const renderCursor = () => {
  const cursor = getCursor();

  document.querySelectorAll('.char').forEach(char => {
    char.classList.remove('selected');
  });

  document.querySelector(`#char-${cursor.x}-${cursor.y}`).classList.add('selected');
}
