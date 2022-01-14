import './css/styles.css';

const refs = {
  menuList: document.querySelector('.menu__list'),
  imageList: document.querySelector('.list-first'),
  pagination: document.querySelector('.pagination'),
};

const baseUrl = 'https://rickandmortyapi.com/api';

function generatePagination(info) {
  let markup = '';
  let activePage = 1;

  if (info.prev !== null) {
    markup += `<a href="${info.prev}">&lArr;</a>`;
    activePage = parseInt(info.prev.split('=')[1]) + 1;
  }
  for (let i = 1; i <= info.pages; i += 1) {
    markup += `<a class='${
      activePage === i ? 'active' : ''
    }' href="${baseUrl}/character?pages=${i}">${i}</a>`;
  }
  if (info.next !== null) {
    markup += `<a href="${info.next}">&rArr;</a>`;
  }
  refs.pagination.innerHTML = markup;
}

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
    generatePagination(data.info);
    const markupImage = data.results
      .map(
        character => `<li class="main-item">
          <img class='image'  src="${character.image}">
          <ul class="item-list">
            <li class="item-text">Name: ${character.name}</li>
            <li class="item-text">Gender: ${character.gender}</li>
            <li class="item-text">Status:${character.status}</li>
            <li class="item-text">Adress: ${character.origin.name}</li>
            <li class="item-text">Species:${character.spicies}</li>
          </ul>
          </li>`,
      )
      .join('');
    refs.imageList.innerHTML = markupImage;
  });
});
