import React from 'react';
import deleteIcon from '../images/delete-icon.svg';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element-template" key={props.card._id} onClick={handleClick}>
      <li className="element">
        <button className="element__delete-button">
          <img className="element__delete-icon" src={deleteIcon} alt="Иконка кнопки удалить" />
        </button>
        <img className="element__photo" src={props.card.url} alt={props.card.name} />
        <div className="element__title-background">
          <h3 className="element__title">{props.card.title}</h3>
          <div className="element__like-wrapper">
            <button className="element__like-button">
              <div className="element__like-icon"></div>
            </button>
            <p className="element__like-number">{props.card.likes}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;