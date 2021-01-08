import './styles.css';

const html = String.raw;

const getSelectableText = text => {
  return text.split('').map(character => `<span class="selectable-character">${character}</span>`).join('');
}

const app = html`
  <div class="title">${getSelectableText('Hello World!')}</div>
`;

const rootNode = document.createElement('div');
rootNode.innerHTML = app;

document.body.appendChild(rootNode);

const selectableCharacters = document.getElementsByClassName("selectable-character");

Array.from(selectableCharacters).forEach(selectableCharacter => {
  selectableCharacter.addEventListener('mouseover', event => {
    console.log(event.target.innerHTML);
  });
});
