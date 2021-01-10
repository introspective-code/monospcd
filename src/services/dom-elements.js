export const getCharElement = ({
  col,
  row,
  character
}) => {
  return `<div class="char" id="char-${col++}-${row}">${character === ' ' ? '&nbsp' : character}</div>`;
}

export const getNewlineElement = () => {
  return '<br/>';
}