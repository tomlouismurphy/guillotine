//ACTION CARD DECK

const deckActions = [];

const discardedActions = [];

//ACTION CARD FUNCTIONS

//Action Card: "Mass Confusion" 
//Returns nobles to deck 
//and deals out new queue of nobles.
const newLine = {	
	name: 'Mass Confusion',
	actionCard () {
		let lengthRedeal = queueNobles.length;
		while (0 < queueNobles.length){
			deckNobles.push(queueNobles[0]);
			queueNobles.shift();
		}
		shuffle(deckNobles);
		for (let i = 0; i < lengthRedeal; i++){
			queueNobles.push(deckNobles[i]);
		}
		for (let i = 0; i < lengthRedeal; i++){
			deckNobles.shift();
		}
		$('.nobleLine').empty();
		assembleNobles();
	}
};
deckActions.push(newLine);

//Action Card: "Rain Delay"
//Shuffle all players' hands into the action deck
//and deal out 5 new action cards to each player.
const newHand = {
	name: 'Rain Delay',
	actionCard () {
		for (let i = 0; i < 2; i++){
			while (0 < gamePlayers[i].myActions.length){
				deckActions.push(gamePlayers[i].myActions[0]);
				gamePlayers[i].myActions.shift();
			}
		}
		shuffle(deckActions);
		for (let j = 0; j < 2; j++){
			for (let i = 0; i < 5; i++){
				gamePlayers[j].myActions.push(deckActions[i]);
			}
			for (let i = 0; i < 5; i++){
				deckActions.shift();
			}
		}
		$('.nobleLine').empty();
		assembleNobles();
	}
};
deckActions.push(newHand);

//Action Card: "The Long Walk"
//Reverse the order of the line.
const reverseNobles = {
	name: 'The Long Walk',
	actionCard () {
		queueNobles.reverse();
		$('.nobleLine').empty();
		assembleNobles();
	}
};
deckActions.push(reverseNobles);

//Action Card: "Missing Heads"
//Your opponent loses a random noble from his/her score pile.
const discardNobleRandom = {
	name: 'Missing Heads',
	actionCard () {
		const randomCard = Math.floor(Math.random() * gamePlayers[1].myNobles.length);
		discardedNobles.push(gamePlayers[1].myNobles[randomCard])
		gamePlayers[1].myNobles.splice(randomCard, 1);
		retotalPoints();
	}
};
deckActions.push(discardNobleRandom);

//Action Card: "Forced Break"
//All other players must discard an action card at random.
const discardActionRandom = {
	name: 'Forced Break',
	actionCard () {
		const randomCard = Math.floor(Math.random() * gamePlayers[1].myActions.length);
		discardedActions.push(gamePlayers[1].myActions[randomCard])
		gamePlayers[1].myActions.splice(randomCard, 1);
	}
};
deckActions.push(discardActionRandom);

//Action Card: "Double Feature"
//Collect an additional noble from the front
//of the line this turn.
const collectExtra = {
	name: 'Double Feature',
	actionCard() {
		let x = queueNobles[0].points;
		gamePlayers[0].score = gamePlayers[0].score + x;
		gamePlayers[0].myNobles.push(queueNobles[0]);
		queueNobles.shift();
		$('.nobleLine').empty();
		assembleNobles();
		retotalPoints();
	}
};
deckActions.push(collectExtra);
deckActions.push(collectExtra);

//Action Card: "After You..."
//Put the noble at the front of the line
//into another player's score pile.
const bestowNoble = {
	name: 'After You...',
	actionCard() {
		let x = queueNobles[0].points;
		gamePlayers[1].score = gamePlayers[1].score + x;
		gamePlayers[1].myNobles.push(queueNobles[0]);
		queueNobles.shift();
		$('.nobleLine').empty();
		assembleNobles();
		retotalPoints();
	}
}
deckActions.push(bestowNoble);

//Action Card: "Information Exchange"
//Trade hands with another player.
const tradeHand = {
	name: 'Information Exchange',
	actionCard () {
		const newArrayOne = [];
		for (i = 0; i < gamePlayers[0].myActions.length; i++){
			newArrayOne.push(gamePlayers[0].myActions[i]);
		}
		gamePlayers[0].myActions.length = 0; 
		const newArrayTwo = [];
		for (i = 0; i < gamePlayers[1].myActions.length; i++){
			newArrayTwo.push(gamePlayers[1].myActions[i]);
		}
		gamePlayers[1].myActions.length = 0;
		for (i = 0; i < newArrayTwo.length; i++){
			gamePlayers[0].myActions.push(newArrayTwo[i]);
		}
		for (i = 0; i < newArrayOne.length; i++){
			gamePlayers[1].myActions.push(newArrayOne[i]);
		}
	}
};
deckActions.push(tradeHand);

//Action Card: "Bribed Guards"
//Move the noble at the front of the line
//to the end of the line.
const backOfLine = {
	name: "Bribed Guards",
	actionCard () {
		queueNobles.push(queueNobles[0]);
		queueNobles.shift();
		$('.nobleLine').empty();
		assembleNobles();
	}
}
deckActions.push(backOfLine);

//Action Card: "Tough Crowd"
//Put this card in front of another player.
//It is worth -2 points to that player.
const twoPointsPenalty = {
	name: 'Tough Crowd',
	actionCard () {
		gamePlayers[1].twoPointPenalty = true;
		retotalPoints();
	}
}
deckActions.push(twoPointsPenalty);

//Action Card: "Fountain of Blood"
//Put this card in front of you.
//It is worth 2 points.
const twoPointsBonus = {
	name: 'Fountain of Blood',
	actionCard () {
		gamePlayers[0].twoPointBonus = true;
		retotalPoints();
	}
}
deckActions.push(twoPointsBonus);

//Action Card: "Extra Cart"
//Add 3 nobles from the noble deck
//to the end of the line.
const dealNobles = {
	name: 'Extra Cart',
	actionCard () {
		for (i = 0; i < 3; i++){
			queueNobles.push(deckNobles[0]);
			deckNobles.shift();
			$('.nobleLine').empty();
			assembleNobles();
		}
	}
}
deckActions.push(dealNobles);
deckActions.push(dealNobles);

//Action Card: "Stumble"
//Move a noble forward exactly 1 place in line.
const moveNobleForwardOne = {
	name: 'Stumble',
	actionCard (x) {
		queueNobles.splice((x - 1), 0, queueNobles[x]);
		queueNobles.splice((x + 1), 1);
		$('.nobleLine').empty();
		assembleNobles();
	}
}

//ACTION CARD DEAL

const dealActions = () => {
	shuffle(deckActions);
	for (let j = 0; j < 2; j++){
		for (let i = 0; i < 5; i++){
			gamePlayers[j].myActions.push(deckActions[i]);
		}
		for (let i = 0; i < 5; i++){
			deckActions.shift();
		}
	}
};