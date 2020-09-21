import React from 'react';
import pencilIcon from '../images/pencil-icon.svg';
import plusIcon from '../images/plus-icon.svg';
import { cardsApi, userDataApi } from './utils/api.js';
import Card from './Card.js';

function Main(props) {

	const [userName, setUserName] = React.useState('');
	const [avatarImage, setAvatarImage] = React.useState('');
	const [userJob, setUserJob] = React.useState('');
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		userDataApi.getData().then(
			res => {
				setUserName(res.name);
			}).catch((err) => {
				console.log(err);
			});
	}, []);

	React.useEffect(() => {
		userDataApi.getData().then(
			res => {
				setAvatarImage(res.avatar);
			}).catch((err) => {
				console.log(err);
			});
	}, []);

	React.useEffect(() => {
		userDataApi.getData().then(
			res => {
				setUserJob(res.about);
			}).catch((err) => {
				console.log(err);
			});
	}, []);

	React.useEffect(() => {
		cardsApi.getData().then(
			(res) => {
				const initialCards = res.map(item => ({
					title: item.name,
					url: item.link,
					likes: item.likes.length,
					id: item._id,
				}))
				setCards(initialCards)
			}).catch((err) => {
				console.log(err);
			});
	}, []);


	return (
		<main>
			<section className="profile">
				<div className="profile__card">
					<div className="profile__avatar-wrap">
						<img className="profile__avatar" src={avatarImage} alt="Аватар пользователя" />
						<button className="profile__change-avatar-button" onClick={props.onEditAvatar}>
							<img className="profile__change-avatar-icon" src={pencilIcon} alt="Иконка кнопки смены аватара" />
						</button>
					</div>
					<div>
						<div className="profile__name-button-container">
							<h1 className="profile__name">{userName}</h1>
							<button className="profile__edit-button" onClick={props.onEditProfile}>
								<img className="profile__edit-button-icon" src={pencilIcon}
									alt="Иконка кнопки редактирования профиля" />
							</button>
						</div>
						<p className="profile__position">{userJob}</p>
					</div>
				</div>
				<button className="profile__add-button" onClick={props.onAddPlace}>
					<img className="profile__add-button-icon" src={plusIcon} alt="Иконка кнопки добавить" />
				</button>
			</section>
			<ul className="elements">
				{cards.map((card) => <Card key={card.id} card={card} onCardClick={props.onCard} />)}
			</ul>
		</main>
	);
}

export default Main;
