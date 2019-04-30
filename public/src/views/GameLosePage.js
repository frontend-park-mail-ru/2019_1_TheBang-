import GameAlertContent from 'src/components/GameAlertContent/GameAlertContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import onPageLoad from 'src/app';
import GameLobbyPage from 'src/views/GameLobbyPage';

class GameLosePage extends ContentMixin {
	constructor() {
		super(GameAlertContent, 'Вы проиграли!', 'Не везет в игре, повезет в любви <3');
	}

	afterRender() {
		const btn = document.querySelector('.link');
		console.log('hello looser');

		const toLobby = () => {
			onPageLoad(null, GameLobbyPage);
			console.log('click hello looser');
			btn.removeEventListener('click', toLobby);
		};
		btn.addEventListener('click', toLobby)
	}
}

export default GameLosePage;