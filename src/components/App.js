import React from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import { userDataApi } from '../utils/api.js';
import { UserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import { cardsApi } from '../utils/api.js';
import AddCardPopup from './AddCardPopup.js';

document.body.style.backgroundColor = 'black';

function App() {
	const [currentUser, setCurrentUserInfo] = React.useState({});
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);

	React.useEffect(() => {
		userDataApi.getData().then(
			res => {
				setCurrentUserInfo(res);
			}).catch((err) => {
				console.log(err);
			});
	}, []);

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

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard(null);
	}

	function handleUpdateUser(name, about) {
		userDataApi.editProfile(name, about).then(
			res => {
				setCurrentUserInfo(res);
				closeAllPopups();
			}).catch((err) => {
				console.log(err);
			});
	}

	function handleUpdateAvatar(link) {
		userDataApi.changeAvatar(link).then(
			res => {
				setCurrentUserInfo(res);
				closeAllPopups();
			}).catch((err) => {
				console.log(err);
			});
	}

	function handleAddPlaceSubmit(title, url) {
		cardsApi.createCard(title, url).then(
			newCard => {
				setCards([...cards, newCard]);
				closeAllPopups();
			}).catch((err) => {
				console.log(err);
			});
	}


	return (
		<div className="page">

			<UserContext.Provider value={currentUser}>

				<Header />

				<Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCard={setSelectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards}/>

				<Footer />

				<EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}/> 

				<AddCardPopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlaceSubmit={handleAddPlaceSubmit} />

				<PopupWithForm name="popup-submit" title="Вы уверены?">
					<button className="form__submit popup-submit__submit-button form__submit-button_no-input" type="submit" value="Подтвердить">Да</button>
				</PopupWithForm>

				<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

				<PopupWithImage card={selectedCard} onClose={closeAllPopups} />

			</UserContext.Provider>

		</div>
	);
}

export default App;
