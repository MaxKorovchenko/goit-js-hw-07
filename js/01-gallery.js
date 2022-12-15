import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

gallery.insertAdjacentHTML('beforeend', galleryMarkup);

gallery.addEventListener('click', onGalleryClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
    })
    .join('');
}

function onGalleryClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  const instance = basicLightbox.create(`<img src="${evt.target.dataset.source}" width="800" height="600">`, {
    onShow: () => {
      window.addEventListener('keydown', onEscKeyDown);
    },

    onClose: () => {
      window.removeEventListener('keydown', onEscKeyDown);
    },
  });

  instance.show();

  function onEscKeyDown(evt) {
    if (evt.code === 'Escape') {
      instance.close();
    }

    console.log(evt);
  }
}
