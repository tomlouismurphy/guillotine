let day = 0;

const queueNobles = [];

const discardedNobles = [];

const gamePlayers = [];

const shuffle = (array) => {
	let i = 0;
	let j = 0;
	let temp = null;
	for (i = array.length - 1; i > 0; i--){
		j = Math.floor(Math.random() * (i + 1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

const dealDay = () => {
	day += 1;
	//to insert later - if day = 4, end game
	shuffle(deckNobles);
	for (let i = 0; i < 12; i++){
		queueNobles.push(deckNobles[i]);
	}
	for (let i = 0; i < 12; i++){
		deckNobles.shift();
	}
	assembleNobles();
};

const assembleNobles = () => {
	for (let i = 0; i < queueNobles.length; i++){
		const $newdiv = $('<div></div>');
		const $h3 = $('<h3/>');
		$h3.text(queueNobles[i].name);
		$newdiv.append($h3);
		$newdiv.addClass('inLine');
		$newdiv.addClass(queueNobles[i].color);
		$('.nobleLine').append($newdiv);
	}
	buttonFunction();
	buttonRefunction();
	//start of tomorrow - if queueNobles is empty, launch modal with score update
};

const buttonFunction = () => {
	$('.inLine').on('click', (e) => {
		$(e.target).addClass('clicked');
		buttonRefunction();
	});
};

const buttonRefunction = () => {
	$('.clicked').on('click', (e) => {
		$($(e.target)[0]).removeClass('clicked');
		buttonFunction();
	});
};

class Player {
	constructor(name){
		this.name = name;
		this.score = 0;
		this.myNobles = [];
		this.myActions = [];
		this.myDisplay = [];
		this.myTurn = false;
		this.greenPlusOne = false;
		this.grayEqualsOne = false;
		this.actionCardBanned = false;
		this.redPlusOne = false;
		this.bluePlusOne = false;
		this.palaceGuardsCollected = 0;
		this.grayCardsCollected = 0;
		this.countCollected = false;
		this.countessCollected = false;
		this.twoPointBonus = false;
		this.twoPointPenalty = false;
	};
	playCard(){

	};
	takeNoble(){
		let x = queueNobles[0].points;
		this.score = this.score + x;
		this.myNobles.push(queueNobles[0]);
		queueNobles.shift();
		endTurn();
		$('.nobleLine').empty();
		assembleNobles();
	}
}

const playerSelect = () => {
	const playerOne = new Player('Player One');
	gamePlayers.push(playerOne);
	const playerTwo = new Player('Player Two');
	gamePlayers.push(playerTwo);
	gamePlayers[0].myTurn = true;
}

const endTurn = () => {
	gamePlayers.reverse();
	gamePlayers[0].myTurn = true;
	gamePlayers[1].myTurn = false;
}

const retotalPoints = () => {
	for (i = 0; i < 2; i++){
		gamePlayers[i].score = 0;
		for (j = 0; j < gamePlayers[i].myNobles.length; j++){
			gamePlayers[i].score += gamePlayers[i].myNobles[j].points;
		}
		if (gamePlayers[i].twoPointBonus === true){
			gamePlayers[i].score += 2;
		}
		if (gamePlayers[i].twoPointPenalty === true){
			gamePlayers[i].score -= 2;
		}
		if (gamePlayers[i].grayEqualsOne === true){
			for (j = 0; j < gamePlayers[i].myNobles.length; j++){
				if (gamePlayers[i].myNobles[j].color === 'gray'){
					gamePlayers[i].score -= gamePlayers[i].myNobles[j].points;
					gamePlayers[i].score += 1;
				}
			}
		}
	}
}