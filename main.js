import {
  renderCharGrid,
  renderCursor,
  renderRoot
} from './services/render';

import {
  handleDocumentKeyDown,
  handleTypeableKey
} from './services/event-handlers';

import {
  setCharGrid
} from './services/globals';

renderRoot();

document.addEventListener('keydown', handleDocumentKeyDown);

renderCharGrid();
renderCursor();
