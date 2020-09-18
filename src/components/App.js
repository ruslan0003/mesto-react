import React from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

function handleEditAvatarClick() {
  const editAvatarButton = document.querySelector('.profile__change-avatar-button');
  const editAvatarPopup = document.querySelector('.popup-avatar');
  editAvatarButton.addEventListener('click', () => {
    editAvatarPopup.classList.add('popup_opened');
    console.log('Нажал на editAvatar');
  });
}

function handleEditProfileClick() {
  const editProfileButton = document.querySelector('.profile__edit-button');
  const editProfilePopup = document.querySelector('.popup-edit');
  editProfileButton.addEventListener('click', () => {
    editProfilePopup.classList.add('popup_opened');
    console.log('Нажал на editProfile');
  });
}

function handleAddPlaceClick() {
  const addCardButton = document.querySelector('.profile__add-button');
  const addCardPopup = document.querySelector('.popup-add');
  addCardButton.addEventListener('click', () => {
    addCardPopup.classList.add('popup_opened');
    console.log('Нажал на addPlace');
  });
}

function App() {
  return (
<div className="page">

  <Header />

  <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick}/>

  <Footer/>

  <PopupWithForm name="popup-edit" title="Редактировать профиль">
        <input className="form__input form__input_type_name" id="name-input" type="text" name="name-input" placeholder="Имя"
          minLength="2" maxLength="40" required/>
        <span className="form__input-error" id="name-input-error"></span>
        <input className="form__input form__input_type_job" type="text" name="job-input" id="job-input" placeholder="О себе"
          minLength="2" maxLength="200" required/>
        <span className="form__input-error" id="job-input-error"></span>
        <button className="form__submit popup-edit__submit-button" type="submit" value="Сохранить">Сохранить</button>
  </PopupWithForm>

  <PopupWithForm name="popup-add" title="Новое место">
    <input className="form__input form__input_type_title" type="text" id="title-input" name="title-input" placeholder="Название" minLength="1" maxLength="30" required/>
        <span className="form__input-error" id="title-input-error"></span>
        <input className="form__input form__input_type_url" id="url-input" name="url-input" placeholder="Ссылка на картинку"
          type="url" required/>
        <span className="form__input-error" id="url-input-error"></span>
        <button className="form__submit popup-add__submit-button" type="submit" value="Создать">Создать</button>
  </PopupWithForm>

  <PopupWithForm name="popup-submit" title="Вы уверены?">
    <button className="form__submit popup-submit__submit-button form__submit-button_no-input" type="submit" value="Подтвердить">Да</button>
  </PopupWithForm>

  <PopupWithForm name="popup-avatar" title="Обновить аватар">
    <input className="form__input form__input_type_avatar_url" id="avatar-url" name="avatar-url" placeholder="Ссылка на аватар"
          type="url" required/>
    <span className="form__input-error" id="avatar-url-error"></span>
    <button className="form__submit popup-avatar__submit-button" type="submit" value="Создать">Сохранить</button>
  </PopupWithForm>

  <PopupWithImage/>

  <template className="element-template">
    <li className="element">
      <button className="element__delete-button">
        <img className="element__delete-icon" src="./images/delete-icon.svg" alt="Иконка кнопки удалить"/>
      </button>
      <img className="element__photo"/>
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
