import React from 'react';
import pencilIcon from '../images/pencil-icon.svg';
import plusIcon from '../images/plus-icon.svg';

function Main(props) {
    return (
        <main>
        <section className="profile">
          <div className="profile__card">
            <div className="profile__avatar-wrap">
              <img className="profile__avatar" src="#" alt="Аватар пользователя"/>
              <button className="profile__change-avatar-button" onClick={props.onEditAvatar}>
                <img className="profile__change-avatar-icon" src={pencilIcon} alt="Иконка кнопки смены аватара"/>
              </button>
            </div>
            <div>
              <div className="profile__name-button-container">
                <h1 className="profile__name"></h1>
                <button className="profile__edit-button" onClick={props.onEditProfile}>
                  <img className="profile__edit-button-icon" src={pencilIcon}
                    alt="Иконка кнопки редактирования профиля"/>
                </button>
              </div>
              <p className="profile__position"></p>
            </div>
          </div>
          <button className="profile__add-button" onClick={props.onAddPlace}>
            <img className="profile__add-button-icon" src={plusIcon} alt="Иконка кнопки добавить"/>
          </button>
        </section>
    
        <ul className="elements">
    
        </ul>
      </main>
    );
}
  
export default Main;