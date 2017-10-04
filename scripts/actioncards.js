//ACTION CARD DECK

const deckActions = [];

const discardedActions = [];

//ACTION CARD FUNCTIONS

//Action Card: "Mass Confusion" 
const newLine = {	
	name: 'Mass Confusion',
	description: 'Returns nobles to deck and deals out new queue of nobles.',
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
const newHand = {
	name: 'Rain Delay',
	description: 'Shuffle all players\' hands into the action deck and deal out 5 new action cards to each player.',
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
const reverseNobles = {
	name: 'The Long Walk',
	description: 'Reverse the order of the line.',
	actionCard () {
		queueNobles.reverse();
		$('.nobleLine').empty();
		assembleNobles();
	}
};
deckActions.push(reverseNobles);

//Action Card: "Missing Heads"
const discardNobleRandom = {
	name: 'Missing Heads',
	description: 'Your opponent loses a random noble from his/her score pile.',
	actionCard () {
		const randomCard = Math.floor(Math.random() * gamePlayers[1].myNobles.length);
		discardedNobles.push(gamePlayers[1].myNobles[randomCard])
		gamePlayers[1].myNobles.splice(randomCard, 1);
		retotalPoints();
	}
};
deckActions.push(discardNobleRandom);

//Action Card: "Forced Break"
const discardActionRandom = {
	name: 'Forced Break',
	description: 'Your opponent must discard an action card at random.',
	actionCard () {
		const randomCard = Math.floor(Math.random() * gamePlayers[1].myActions.length);
		discardedActions.push(gamePlayers[1].myActions[randomCard])
		gamePlayers[1].myActions.splice(randomCard, 1);
	}
};
deckActions.push(discardActionRandom);

//Action Card: "Double Feature"
const collectExtra = {
	name: 'Double Feature',
	description: 'Collect an additional noble from the front of the line this turn.',
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
const bestowNoble = {
	name: 'After You...',
	description: 'Put the noble at the front of the line into your opponent\'s score pile.',
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
const tradeHand = {
	name: 'Information Exchange',
	description: 'Trade hands with your opponent.',
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
const backOfLine = {
	name: "Bribed Guards",
	description: 'Move the noble at the front of the line to the end of the line.',
	actionCard () {
		queueNobles.push(queueNobles[0]);
		queueNobles.shift();
		$('.nobleLine').empty();
		assembleNobles();
	}
}
deckActions.push(backOfLine);

//Action Card: "Tough Crowd"
const twoPointsPenalty = {
	name: 'Tough Crowd',
	description: 'Assign this card to your opponent. It is worth -2 points to that player.',
	actionCard () {
		gamePlayers[1].twoPointPenalty = true;
		retotalPoints();
	}
}
deckActions.push(twoPointsPenalty);

//Action Card: "Fountain of Blood"
const twoPointsBonus = {
	name: 'Fountain of Blood',
	description: 'Assign this card to yourself. It is worth 2 points.',
	actionCard () {
		gamePlayers[0].twoPointBonus = true;
		retotalPoints();
	}
}
deckActions.push(twoPointsBonus);

//Action Card: "Extra Cart"
const dealNobles = {
	name: 'Extra Cart',
	description: 'Add 3 nobles from the noble deck to the end of the line.',
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
const moveNobleForwardOne = {
	name: 'Stumble',
	description: 'Move a noble forward exactly 1 place in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 1){
					return 0;
				} else {
					let stumbler;
					window.stumbler = i;
				}
			}
		}
		queueNobles.splice((stumbler - 1), 0, queueNobles[stumbler]);
		queueNobles.splice((stumbler + 1), 1);
		$('.nobleLine').empty();
		assembleNobles();
		return stumbler;
	}
}
deckActions.push(moveNobleForwardOne);
deckActions.push(moveNobleForwardOne);

//Action Card: "Pushed"
const moveNobleForwardTwo = {
	name: 'Pushed',
	description: 'Move a noble forward exactly 2 places in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 2){
					return 0;
				} else {
					let pushed;
					window.pushed = i;
				} 
			}
		}
		queueNobles.splice((pushed - 2), 0, queueNobles[pushed]);
		queueNobles.splice((pushed + 1), 1);
		$('.nobleLine').empty();
		assembleNobles();
		return pushed;
	}
}
deckActions.push(moveNobleForwardTwo);
deckActions.push(moveNobleForwardTwo);

//Action Card: "L'Idiot"
//Move a noble forward up to 2 places in line.
//NOTE: FUNCTIONALITY TO PICK EITHER 1 OR 2 PLACES
//IS NOT CURRENTLY COMPLETE
const moveNobleForwardTwoVariable = {
	name: 'L\'Idiot',
	description: 'Move a noble forward 2 places in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 2){
					return 0;
				} else {
					let idiot;
					window.idiot = i;
				} 
			}
		}
		queueNobles.splice((idiot - 2), 0, queueNobles[idiot]);
		queueNobles.splice((idiot + 1), 1);
		$('.nobleLine').empty();
		assembleNobles();
		return idiot;
	}
}
deckActions.push(moveNobleForwardTwoVariable);
deckActions.push(moveNobleForwardTwoVariable);

//Action Card: "Tis a Far Better Thing"
const moveNobleForwardThree = {
	name: 'Tis a Far Better Thing',
	description: 'Move a noble forward exactly 3 places in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 3){
					return 0;
				} else {
					let sydney;
					window.sydney = i;
				} 
			}
		}
		queueNobles.splice((sydney - 3), 0, queueNobles[sydney]);
		queueNobles.splice((sydney + 1), 1);
		$('.nobleLine').empty();
		assembleNobles();
		return sydney;
	}
}
deckActions.push(moveNobleForwardThree);
deckActions.push(moveNobleForwardThree);

//Action Card: "Ignoble Noble"
const moveNobleForwardFour = {
	name: 'Ignoble Noble',
	description: 'Move a noble forward exactly 4 places in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 4){
					return 0;
				} else {
					let ignoble;
					window.ignoble = i;
				} 
			}
		}
		queueNobles.splice((ignoble - 4), 0, queueNobles[ignoble]);
		queueNobles.splice((ignoble + 1), 1);
		$('.nobleLine').empty();
		assembleNobles();
		return ignoble;
	}
}
deckActions.push(moveNobleForwardFour);
deckActions.push(moveNobleForwardFour);

//Action Card: "Friend of the Queen"
//Move a noble backward up to 2 places in line.
//NOTE: FUNCTIONALITY TO PICK EITHER 1 OR 2 PLACES
//IS NOT CURRENTLY COMPLETE
const moveNobleBackwardTwo = {
	name: 'Friend of the Queen',
	description: 'Move a noble backward exactly 2 places in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i > queueNobles.length - 3){
					return 0;
				} else {
					let friend;
					window.friend = i;
				} 
			}
		}
		queueNobles.splice((friend + 3), 0, queueNobles[friend]);
		queueNobles.splice((friend), 1);
		$('.nobleLine').empty();
		assembleNobles();
		return friend;
	}
}
deckActions.push(moveNobleBackwardTwo);
deckActions.push(moveNobleBackwardTwo);

//Action Card: "Fainting Spell"
//Move a noble backward up to 3 places in line.
//NOTE: FUNCTIONALITY TO PICK 1, 2 OR 3 PLACES
//IS NOT CURRENTLY COMPLETE
const moveNobleBackwardThree = {
	name: 'Fainting Spell',
	description: 'Move a noble backward up to 3 places in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i > queueNobles.length - 4){
					return 0;
				} else {
					let faint;
					window.faint = i;
				} 
			}
		}
		queueNobles.splice((faint + 4), 0, queueNobles[faint]);
		queueNobles.splice(faint, 1);
		$('.nobleLine').empty();
		assembleNobles();
		return faint;
	}
}
deckActions.push(moveNobleBackwardThree);

//Action Card: "Civic Pride"
//Move a Green noble forward exactly 2 places in line.
//NOTE: Function was originally variable in card.
const moveNobleForwardTwoGreen = {
	name: 'Civic Pride',
	description: 'Move a Green noble forward exactly 2 places in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		if ($('.clicked').hasClass('green') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 2){
					return 0;
				} else {
					let pushedGreen;
					window.pushedGreen = i;
				} 
			}
		}
		queueNobles.splice((pushedGreen - 2), 0, queueNobles[pushedGreen]);
		queueNobles.splice((pushedGreen + 1), 1);
		$('.nobleLine').empty();
		assembleNobles();
		return pushedGreen;
	}
}
deckActions.push(moveNobleForwardTwoGreen);

//Action Card: "Majesty"
//Move a Purple noble forward exactly 2 places in line.
//NOTE: Function was originally variable in card.
const moveNobleForwardTwoPurple = {
	name: 'Majesty',
	description: 'Move a Purple noble forward exactly 2 places in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		if ($('.clicked').hasClass('purple') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 2){
					return 0;
				} else {
					let pushedPurple;
					window.pushedPurple = i;
				} 
			}
		}
		queueNobles.splice((pushedPurple - 2), 0, queueNobles[pushedPurple]);
		queueNobles.splice((pushedPurple + 1), 1);
		$('.nobleLine').empty();
		assembleNobles();
		return pushedPurple;
	}
}
deckActions.push(moveNobleForwardTwoPurple);

//Action Card: "Military Might"
//Move a Red noble forward exactly 2 places in line.
//NOTE: Function was originally variable in card.
const moveNobleForwardTwoRed = {
	name: 'Military Might',
	description: 'Move a Red noble forward exactly 2 places in line.',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		if ($('.clicked').hasClass('red') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 2){
					return 0;
				} else {
					let pushedRed;
					window.pushedRed = i;
				} 
			}
		}
		queueNobles.splice((pushedRed - 2), 0, queueNobles[pushedRed]);
		queueNobles.splice((pushedRed + 1), 1);
		$('.nobleLine').empty();
		assembleNobles();
		return pushedRed;
	}
}
deckActions.push(moveNobleForwardTwoRed);

//Action Card: "Fled to England"
const discardNoble = {
	name: 'Fled to England',
	description: 'Discard any noble in line.',
	actionCard () {
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				discardedNobles.push(queueNobles[i]);
				queueNobles.splice(i, 1);
				$('.nobleLine').empty();
				assembleNobles();
				return i;
			}
		}
	}
}
deckActions.push(discardNoble);

//Action Card: "Public Demand"
const frontOfLine = {
	name: 'Public Demand',
	description: 'Move any noble in line to the front of the line.',
	actionCard () {
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				queueNobles.unshift(queueNobles[i]);
				queueNobles.splice((i + 1), 1);
				$('.nobleLine').empty();
				assembleNobles();
				return i;
			}
		}
	}
}
deckActions.push(frontOfLine);

//Action Card: "Clothing Swap"
const dealReplacement = {
	name: 'Clothing Swap',
	description: 'Choose any noble in line and discard it. Replace it with the top noble from the noble deck.',
	actionCard () {
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				discardedNobles.push(queueNobles[i]);
				queueNobles[i] = deckNobles[0];
				deckNobles.shift();
				$('.nobleLine').empty();
				assembleNobles();
				return i;
			}
		}
	}
}
deckActions.push(dealReplacement);

//Action Card: "Missed!"
//Choose a player. That player must place the last
//noble he or she collected at the end of the line.
const noblePutBack = {
	name: 'Missed!',
	description: 'Your opponent must place the last noble he or she collected at the end of the line.',
	actionCard () {
		queueNobles.push(gamePlayers[1].myNobles[gamePlayers[1].myNobles.length - 1]);
		gamePlayers[1].myNobles.pop();
		$('.nobleLine').empty();
		assembleNobles();
		retotalPoints();
	}
}
deckActions.push(noblePutBack);

//Action Card: "Indifferent Public"
const changeGray = {
	name: 'Indifferent Public',
	description: 'Assign this card to yourself. Any Gray nobles in your score pile are worth 1 point instead of their normal values.',
	actionCard () {
		gamePlayers[0].grayEqualsOne = true;
		retotalPoints();
	}
}
deckActions.push(changeGray);

//Action Card: "Lack of Faith"
const blueToFront = {
	name: 'Lack of Faith',
	description: 'If there are any Blue nobles in line, move the one nearest the front of the line to the front of the line.',
	actionCard () {
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('blue')){
				queueNobles.unshift(queueNobles[i]);
				queueNobles.splice((i + 1), 1);
				$('.nobleLine').empty();
				assembleNobles();
				return i;
			}
		}
	}
}
deckActions.push(blueToFront);

//Action Card: "Political Influence"
const drawActions = {
	name: 'Political Influence',
	description: 'Draw 3 additional action cards at the end of your turn. Do not collect a noble this turn.',
	actionCard () {
		for (i = 0; i < 3; i++){
			gamePlayers[0].myActions.push(deckActions[0]);
			deckActions.shift();
		}
		endTurn();
	}
}
deckActions.push(drawActions);
deckActions.push(drawActions);

//Action Card: "Confusion in Line"
//Choose a player. Randomly rearrange the line just before
//that player collects his or her next noble.
const rearrangeNobles = {
	name: 'Confusion in Line',
	description: 'Randomly rearrange the line before your opponent\'s next turn.',
	actionCard () {
		gamePlayers[0].takeNoble();
		shuffle(queueNobles);
		$('.nobleLine').empty();
		assembleNobles();
	}
}
deckActions.push(rearrangeNobles);

//Action Card: "Scarlet Pimpernel"
const endDay = {
	name: 'Scarlet Pimpernel',
	description: 'The day ends after you finish your turn. Discard any nobles remaining in line.',
	actionCard () {
		gamePlayers[0].takeNoble();
		const temp = queueNobles.length;
		for (let i = 0; i < temp; i++){
			discardedNobles.push(queueNobles[0]);
			queueNobles.shift();
		}
		$('.nobleLine').empty();
		assembleNobles();
	}
}
deckActions.push(endDay);

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
	assembleActions();
	buttonFunction();
};