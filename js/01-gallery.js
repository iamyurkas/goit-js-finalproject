import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');

const galleryMarkup = galleryItems
    .map(
        ({ preview, description, original }) => `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>`
    )
    .join("");

gallery.insertAdjacentHTML("beforeend", galleryMarkup);

const onClickImage = (event) => {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return
    };
  
    const imgSrc = event.target.dataset.source;
    const imgAlt = event.target.alt;

    const instance = basicLightbox.create(`<img src="${imgSrc}" alt="${imgAlt}" width="800" height="600"/>`);
    
    instance.show();
    
    const pressEsc = (event) => {
        if (event.code !== 'Escape') return;
        instance.close();
        document.removeEventListener('keydown', pressEsc);
    }

    document.addEventListener('keydown', pressEsc);
}

gallery.addEventListener("click", onClickImage);