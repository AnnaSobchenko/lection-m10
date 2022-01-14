import './css/styles.css';

const refs = {
  menuList: document.querySelector('.menu__list'),
  imageList: document.querySelector('main ul'),
};

const baseUrl = 'https://rickandmortyapi.com/api';

function getDataServer(url) {
  return fetch(url).then(response => response.json());
}

getDataServer(baseUrl).then(data => {
  const markup = Object.entries(data)
    .map(
      ([key, value]) => `
    <li><a href="${value}">${key}</a></li>
    `,
    )
    .join('');
  refs.menuList.innerHTML = markup;
});

document.addEventListener('click', event => {
  if (event.target.nodeName !== 'A') return;
  event.preventDefault();
  getDataServer(event.target.href).then(data => {
    const markupImage = data.results
      .map(character => `<li class="image"><img src="${character.image}"></li>`)
      .join('');
    refs.imageList.innerHTML = markupImage;
  });
});
