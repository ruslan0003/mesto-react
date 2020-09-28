import React from 'react';
import pencilIcon from '../images/pencil-icon.svg';
import plusIcon from '../images/plus-icon.svg';
import { cardsApi } from './utils/api.js';
import Card from './Card.js';
import { UserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

	const currentUser = React.useContext(UserContext);
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		cardsApi.getData().then(
			(res) => {
				const initialCards = res.map(item => ({
					name: item.name,
					link: item.link,
					likes: item.likes,
					_id: item._id,
					owner: {
						_id: item.owner._id,
					}
				}))
				setCards(initialCards)
			}).catch((err) => {
				console.log(err);
			});
	}, []);

	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		// Отправляем запрос в API и получаем обновлённые данные карточки
		cardsApi.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
			// Формируем новый массив на основе имеющегося, подставляя в него новую карточку
			const newCards = cards.map((c) => c._id === card._id ? newCard : c);
		  // Обновляем стейт
			setCards(newCards);
		});
	}

	function handleCardDelete(card) {
		cardsApi.deleteCard(card._id).then(() => {
			const cardsWithoutDeleted = cards.filter(c => c._id !== card._id);
			setCards(cardsWithoutDeleted);
		})
	}

	return (
		<main>
			<section className="profile">
				<div className="profile__card">
					<div className="profile__avatar-wrap">
						<img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
						<button className="profile__change-avatar-button" onClick={props.onEditAvatar}>
							<img className="profile__change-avatar-icon" src={pencilIcon} alt="Иконка кнопки смены аватара" />
						</button>
					</div>
					<div>
						<div className="profile__name-button-container">
							<h1 className="profile__name">{currentUser.name}</h1>
							<button className="profile__edit-button" onClick={props.onEditProfile}>
								<img className="profile__edit-button-icon" src={pencilIcon}
									alt="Иконка кнопки редактирования профиля" />
							</button>
						</div>
						<p className="profile__position">{currentUser.about}</p>
					</div>
				</div>
				<button className="profile__add-button" onClick={props.onAddPlace}>
					<img className="profile__add-button-icon" src={plusIcon} alt="Иконка кнопки добавить" />
				</button>
			</section>
			<ul className="elements">
				{cards.map((card) => <Card key={card._id} card={card} onCardClick={props.onCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />)}
			</ul>
		</main>
	);
}

export default Main;
