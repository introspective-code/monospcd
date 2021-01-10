import {
  getCharElement,
  getNewlineElement
} from './dom-elements';

export const renderCharGrid = ({ charGrid }) => {
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

export const renderCursor = ({ cursor }) => {
  document.querySelectorAll('.char').forEach(char => {
    char.classList.remove('selected');
  });

  document.querySelector(`#char-${cursor.x}-${cursor.y}`).classList.add('selected');
}
