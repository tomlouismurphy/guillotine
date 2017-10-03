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
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 1){
					return i;
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
//Move a noble forward exactly 2 places in line.
const moveNobleForwardTwo = {
	name: 'Pushed',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 2){
					return i;
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
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 2){
					return i;
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
//Move a noble forward exactly 3 places in line.
const moveNobleForwardThree = {
	name: 'Tis a Far Better Thing',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 3){
					return i;
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
//Move a noble forward exactly 4 places in line.
const moveNobleForwardFour = {
	name: 'Ignoble Noble',
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i < 4){
					return i;
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
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i > queueNobles.length - 3){
					return i;
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
	actionCard () {
		if ($('.nobleLine').children().hasClass('clicked') === false){
			return 0;
		}
		for (i = 0; i < queueNobles.length; i++){
			if ($($('.nobleLine').children()[i]).hasClass('clicked')){
				if (i > queueNobles.length - 4){
					return i;
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
const moveNobleForwardTwoGreen = {
	name: 'Civic Pride',
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
					return i;
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
const moveNobleForwardTwoPurple = {
	name: 'Majesty',
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
					return i;
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
const moveNobleForwardTwoRed = {
	name: 'Military Might',
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
					return i;
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
//Discard any noble in line.
const discardNoble = {
	name: 'Fled to England',
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
//Move any noble in line to the front of the line.
const frontOfLine = {
	name: 'Public Demand',
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
//Choose any noble in line and discard it.
//Replace it with the top noble from the noble deck.
const dealReplacement = {
	name: 'Clothing Swap',
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
//Put this card in front of you.
//Any Gray nobles in your score pile
//are worth 1 point instead of their normal values.
const changeGray = {
	name: 'Indifferent Public',
	actionCard () {
		gamePlayers[0].grayEqualsOne = true;
		retotalPoints();
	}
}
deckActions.push(changeGray);

//Action Card: "Lack of Faith"
//If there are any Blue nobles in line, move the one
//nearest the front of the line to the front of the line.
const blueToFront = {
	name: 'Lack of Faith',
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
//Draw 3 additional action cards at the end of your turn.
//Do not collect a noble this turn.
const drawActions = {
	name: 'Political Influence',
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
	actionCard () {
		gamePlayers[0].takeNoble();
		shuffle(queueNobles);
		$('.nobleLine').empty();
		assembleNobles();
	}
}
deckActions.push(rearrangeNobles);

//Action Card: "Scarlet Pimpernel"
//The day ends after you finish your turn.
//Discard any nobles remaining in line.
const endDay = {
	name: 'Scarlet Pimpernel',
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
};