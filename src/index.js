import './styles.css';

const exampleCharGrid = 'abc\ndef\nghi';

const cursor = {
  x: 0,
  y: 0
}

const boundaries = {
  x: exampleCharGrid.split('\n')[0].length - 1,
  y: exampleCharGrid.split('\n').length - 1
}

const isTypeable = key => {
  return '~`1!2@3#4$5%6^7&8*9(0)-_=+qQwWeErRtTyYuUiIoOpP[{]}\|aAsSdDfFgGhHjJkKlL;:\'"zZxXcCvVbBnNmM,<.>/? '.includes(key);
}

const renderCharGrid = charGrid => {
  let row = 0;
  let col = 0;

  const markup = charGrid.split('').map(character => {
    if (character === '\n') {
      row++;
      col = 0;
      return '<br/>';
    } else {
      return `<div class="char" id="char-${col++}-${row}">${character === ' ' ? '&nbsp' : character}</div>`;
    }
  }).join('');

  return markup;
}

const renderCursor = () => {
  document.querySelectorAll('.char').forEach(char => {
    char.classList.remove('selected');
  });

  document.querySelector(`#char-${cursor.x}-${cursor.y}`).classList.add('selected');
}

const app = `
  <div id="root">${renderCharGrid(exampleCharGrid)}</div>
`;

const rootNode = document.createElement('div');
rootNode.innerHTML = app;

document.body.appendChild(rootNode);

document.addEventListener('keydown', event => {
  const newlineLength = 1;
  const boundaryOffset = 1;

  if (isTypeable(event.key)) {
    // Update char grid and recalculate dom chars
    // exampleCharGrid[cursor.x + cursor.y * (boundaries.x + newlineLength + boundaryOffset)];
  }

  if (event.key === 'ArrowUp' && cursor.y > 0) {
    cursor.y -= 1;
  }
  if (event.key === 'ArrowDown' && cursor.y < boundaries.y) {
    cursor.y += 1;
  }
  if (event.key === 'ArrowLeft' && cursor.x > 0) {
    cursor.x -= 1;
  }
  if (event.key === 'ArrowRight' && cursor.x < boundaries.x) {
    cursor.x += 1;
  }

  renderCursor();
});

renderCursor();