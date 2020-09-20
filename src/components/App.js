import React from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

function App() {

  const editAvatarPopup = document.querySelector('.popup-avatar');
  const editProfilePopup = document.querySelector('.popup-edit');
  const addCardPopup = document.querySelector('.popup-add');

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    const editAvatarPopup = document.querySelector('.popup-avatar');
    const editAvatarButton = document.querySelector('.profile__change-avatar-button');
    editAvatarButton.addEventListener('click', () => {
      setIsEditAvatarPopupOpen(true);
      editAvatarPopup.classList.add('popup_opened');
      console.log(isEditAvatarPopupOpen);
    });
  }

  function handleEditProfileClick() {
    const editProfilePopup = document.querySelector('.popup-edit');
    const editProfileButton = document.querySelector('.profile__edit-button');
    editProfileButton.addEventListener('click', () => {
      setIsEditProfilePopupOpen(true);
      editProfilePopup.classList.add('popup_opened');
      console.log(isEditProfilePopupOpen);
    });
  }

  function handleAddPlaceClick() {
    const addCardPopup = document.querySelector('.popup-add');
    const addCardButton = document.querySelector('.profile__add-button');
    addCardButton.addEventListener('click', () => {
      setIsAddPlacePopupOpen(true);
      addCardPopup.classList.add('popup_opened');
      console.log(isAddPlacePopupOpen);
    });
  }

  function handleCloseEditProfilePopup() {
    const closeEditProfileButton = document.querySelector('.popup-edit__close-button');
    closeEditProfileButton.addEventListener('click', () => {
      setIsEditProfilePopupOpen(false);
      editProfilePopup.classList.remove('popup_opened');
      console.log(isEditProfilePopupOpen);
    });
  }

  function handleCloseEditAvatarPopup() {
    const closeEditAvatarButton = document.querySelector('.popup-avatar__close-button');
    closeEditAvatarButton.addEventListener('click', () => {
      setIsEditAvatarPopupOpen(false);
      editAvatarPopup.classList.remove('popup_opened');
      console.log(isEditAvatarPopupOpen);
    });
  }

  function handleCloseAddPlacePopup() {
    const closeAddPlaceButton = document.querySelector('.popup-add__close-button');
    closeAddPlaceButton.addEventListener('click', () => {
      setIsAddPlacePopupOpen(false);
      addCardPopup.classList.remove('popup_opened');
      console.log(isAddPlacePopupOpen);
    });
  }


  return (
    <div className="page">

      <Header />

      <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} />

      <Footer />

      <PopupWithForm name="popup-edit" title="Редактировать профиль" onClose={handleCloseEditProfilePopup}>
        <input className="form__input form__input_type_name" id="name-input" type="text" name="name-input" placeholder="Имя"
          minLength="2" maxLength="40" required />
        <span className="form__input-error" id="name-input-error"></span>
        <input className="form__input form__input_type_job" type="text" name="job-input" id="job-input" placeholder="О себе"
          minLength="2" maxLength="200" required />
        <span className="form__input-error" id="job-input-error"></span>
        <button className="form__submit popup-edit__submit-button" type="submit" value="Сохранить">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="popup-add" title="Новое место" onClose={handleCloseAddPlacePopup}>
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

      <PopupWithForm name="popup-avatar" title="Обновить аватар" onClose={handleCloseEditAvatarPopup}>
        <input className="form__input form__input_type_avatar_url" id="avatar-url" name="avatar-url" placeholder="Ссылка на аватар"
          type="url" required />
        <span className="form__input-error" id="avatar-url-error"></span>
        <button className="form__submit popup-avatar__submit-button" type="submit" value="Создать">Сохранить</button>
      </PopupWithForm>

      <PopupWithImage />

      <template className="element-template">
        <li className="element">
          <button className="element__delete-button">
            <img className="element__delete-icon" src="./images/delete-icon.svg" alt="Иконка кнопки удалить" />
          </button>
          <img className="element__photo" />
          <div className="element__title-background">
            <h3 className="element__title"></h3>
            <div className="element__like-wrapper">
              <button className="element__like-button">
                <div className="element__like-icon"></div>
              </button>
              <p className="element__like-number">#</p>
            </div>
          </div>
        </li>
      </template>
    </div>
  );
}

export default App;
