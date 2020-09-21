import React from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

document.body.style.backgroundColor = 'black';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    console.log(isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    console.log(isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    console.log(isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">

      <Header />

      <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCard={setSelectedCard} />

      <Footer />

      <PopupWithForm name="popup-edit" title="Редактировать профиль" onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}>
        <input className="form__input form__input_type_name" id="name-input" type="text" name="name-input" placeholder="Имя"
          minLength="2" maxLength="40" required />
        <span className="form__input-error" id="name-input-error"></span>
        <input className="form__input form__input_type_job" type="text" name="job-input" id="job-input" placeholder="О себе"
          minLength="2" maxLength="200" required />
        <span className="form__input-error" id="job-input-error"></span>
        <button className="form__submit popup-edit__submit-button" type="submit" value="Сохранить">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="popup-add" title="Новое место" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
        <input className="form__input form__input_type_title" type="text" id="title-input" name="title-input" placeholder="Название" minLength="1" maxLength="30" required />
        <span className="form__input-error" id="title-input-error"></span>
        <input className="form__input form__input_type_url" id="url-input" name="url-input" placeholder="Ссылка на картинку"
          type="url" required />
        <span className="form__input-error" id="url-input-error"></span>
        <button className="form__submit popup-add__submit-button" type="submit" value="Создать">Создать</button>
      </PopupWithForm>

      <PopupWithForm name="popup-submit" title="Вы уверены?">
        <button className="form__submit popup-submit__submit-button form__submit-button_no-input" type="submit" value="Подтвердить">Да</button>
      </PopupWithForm>

      <PopupWithForm name="popup-avatar" title="Обновить аватар" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
        <input className="form__input form__input_type_avatar_url" id="avatar-url" name="avatar-url" placeholder="Ссылка на аватар"
          type="url" required />
        <span className="form__input-error" id="avatar-url-error"></span>
        <button className="form__submit popup-avatar__submit-button" type="submit" value="Создать">Сохранить</button>
      </PopupWithForm>

      <PopupWithImage card={selectedCard} onClose={closeAllPopups} />

    </div>
  );
}

export default App;
