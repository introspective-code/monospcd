import './styles.css';
import {
  isTypeable,
  getCharGridIndexAtCursor,
  getUpdatedCharGrid
} from './utils/helpers';
import {
  renderCharGrid,
  renderCursor
} from './services/render';

let charGrid = 'abc\ndef\nghi';

let cursor = {
  x: 0,
  y: 0
}

let boundaries = {
  x: charGrid.split('\n')[0].length - 1,
  y: charGrid.split('\n').length - 1
}

const rootNode = document.createElement('div');
rootNode.innerHTML = `<div id="root"></div>`;
document.body.appendChild(rootNode);

const handleDocumentKeyDown = event => {
  if (isTypeable(event.key)) {
    charGrid = getUpdatedCharGrid({
      charGrid,
      key: event.key,
      updateIndex: getCharGridIndexAtCursor({ cursor, boundaries })
    });

    boundaries = {
      x: charGrid.split('\n')[0].length - 1,
      y: charGrid.split('\n').length - 1
    }

    cursor.x += 1

    renderCharGrid({ charGrid });
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

  renderCursor({ cursor });
}

document.addEventListener('keydown', handleDocumentKeyDown);

renderCharGrid({ charGrid });
renderCursor({ cursor });
