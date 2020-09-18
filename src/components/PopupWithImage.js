import React from 'react';

function PopupWithImage() {
  return (
    <section className="popup popup-image">
    <figure className="popup-image__container">
    <img className="popup-image__photo" src="#"/>
    <button className="popup-image__close-button">
      <img className="popup-image__close-icon close-icon" src="./images/close-icon.svg"
      alt="Иконка закрытия модального окна"/>
    </button>
    <figcaption className="popup-image__title"></figcaption>
    </figure>
    </section>
  );
}

export default PopupWithImage;