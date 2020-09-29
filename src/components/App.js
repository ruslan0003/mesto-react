import React from 'react';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import { userDataApi } from './utils/api.js';
import { UserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';

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


	return (
		<div className="page">

			<UserContext.Provider value={currentUser}>

				<Header />

				<Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCard={setSelectedCard} />

				<Footer />

				<EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}/> 

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

				<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

				<PopupWithImage card={selectedCard} onClose={closeAllPopups} />

			</UserContext.Provider>

		</div>
	);
}

export default App;
