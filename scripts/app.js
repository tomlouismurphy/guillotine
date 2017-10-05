let day = 0;

//The line of nobles awaiting their turn at the guillotine.
const queueNobles = [];

//Nobles that have been discarded from the line
//and will not be available for collection
const discardedNobles = [];

//Represents the two players
const gamePlayers = [];

//Function that can shuffle any collection of cards in game.
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

//Function to deal out nobles deck and start new day.
const dealDay = () => {
	day += 1;
	$('#daydisplay').text('Day ' + day);
	shuffle(deckNobles);
	for (let i = 0; i < 12; i++){
		queueNobles.push(deckNobles[i]);
	}
	for (let i = 0; i < 12; i++){
		deckNobles.shift();
	}
	assembleNobles();
};

//Displays the current status of the line of nobles
//awaiting the guillotine
//as a sequence of divs
//if the line of nobles is empty, this function also
//launches a modal with a score update
//and triggers a new day
const assembleNobles = () => {
	for (let i = 0; i < queueNobles.length; i++){
		const $newdiv = $('<div></div>');
		const $newspan = $('<span/>');
		$newspan.text(queueNobles[i].points);
		$newspan.addClass('pointValue');
		const $h3 = $('<h3/>');
		$h3.text(queueNobles[i].name);
		$newdiv.append($newspan);
		$newdiv.append($h3);
		$newdiv.addClass('inLine');
		$newdiv.addClass(queueNobles[i].color);
		$('.nobleLine').append($newdiv);
	}
	if (queueNobles.length === 0){
		$('#myModal').css('display', 'block');
		if (day < 3){
			$('#modal-update').text('At the end of day ' + day + ', ' + gamePlayers[0].name + ' has collected ' 
			+ gamePlayers[0].myNobles.length + ' nobles and scored ' + gamePlayers[0].score + ' points. ' 
			+ gamePlayers[1].name + ' has collected ' + gamePlayers[1].myNobles.length 
			+ ' nobles and scored ' + gamePlayers[1].score + ' points.')
		} else if (day === 3 && gamePlayers[0].score > gamePlayers[1].score){
			$('#modal-update').text('At the end of the final day, ' + gamePlayers[0].name + ' has collected ' 
			+ gamePlayers[0].myNobles.length + ' nobles and scored ' + gamePlayers[0].score + ' points. ' 
			+ gamePlayers[1].name + ' has collected ' + gamePlayers[1].myNobles.length 
			+ ' nobles and scored ' + gamePlayers[1].score + ' points. ' + gamePlayers[0].name + ' is the winner!')
		} else if (day === 3 && gamePlayers[1].score > gamePlayers[0].score){
			$('#modal-update').text('At the end of the final day, ' + gamePlayers[0].name + ' has collected ' 
			+ gamePlayers[0].myNobles.length + ' nobles and scored ' + gamePlayers[0].score + ' points. ' 
			+ gamePlayers[1].name + ' has collected ' + gamePlayers[1].myNobles.length 
			+ ' nobles and scored ' + gamePlayers[1].score + ' points. ' + gamePlayers[1].name + ' is the winner!')
		} else if (day === 3 && gamePlayers[0].score === gamePlayers[1].score){
			$('#modal-update').text('At the end of the final day, ' + gamePlayers[0].name + ' has collected ' 
			+ gamePlayers[0].myNobles.length + ' nobles and scored ' + gamePlayers[0].score + ' points. ' 
			+ gamePlayers[1].name + ' has collected ' + gamePlayers[1].myNobles.length 
			+ ' nobles and scored ' + gamePlayers[1].score + ' points. Tie game!')
		}
	}
	buttonFunction();
	buttonRefunction();
};

//Displays the action cards in hand for the
//player whose turn it is.
//Functionality also installed to
//display card effects upon clicking info button
const assembleActions = () => {
	for (let i = 0; i < gamePlayers[0].myActions.length; i++){
		const $newdiv = $('<div></div>');
		const $h3 = $('<h3/>');
		$h3.text(gamePlayers[0].myActions[i].name);
		$newdiv.append($h3);
		const $button = $('<button/>');
		$button.text('Info');
		$button.addClass('descriptor');
		$newdiv.append($button);
		const $datadiv = $('<div/>');
		$datadiv.data('info', gamePlayers[0].myActions[i].description);
		$datadiv.addClass('datadiv');
		$newdiv.append($datadiv);
		$newdiv.addClass('inHand');
		$('.actionHand').append($newdiv);
	}
	if ($('.confirmation').children().length === 0){
		const $confirmationbutton = $('<button/>');
		$confirmationbutton.text('Use Selected Action Card');
		$confirmationbutton.addClass('confirmationbutton');
		$('.confirmation').append($confirmationbutton);
		confirmationOperation();
	}
};

//Allows noble cards to be selected for modification
//by action cards, or action cards to be selected for use.
const buttonFunction = () => {
	$('.inLine').on('click', (e) => {
		$(e.target).addClass('clicked');
		buttonRefunction();
	});
	$('.inHand').on('click', (e) => {
		$(e.target).addClass('clicked');
		buttonRefunction();
	});
	$('.descriptor').on('click', (e) => {
		$('#infoModal').css('display', 'block');
		let datum = $($(e.target).parent().children()[2]).data('info');
		$('#infomodal-update').text(datum);
	})
};

//Allows selected noble cards to be deselected
//so that the player can rethink
//and select a new card
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
		this.actionCardPlayedInTurn = false;
	};
	playCard(){

	};
	takeNoble(){
		this.myNobles.push(queueNobles[0]);
		queueNobles.shift();
		endTurn();
		retotalPoints();
		$('.nobleLine').empty();
		assembleNobles();
		$('.actionHand').empty();
		assembleActions();
		buttonFunction();
	}
};

//Sets up the two players and decides who goes first
const playerSelect = () => {
	const playerOne = new Player('Player One');
	gamePlayers.push(playerOne);
	const playerTwo = new Player('Player Two');
	gamePlayers.push(playerTwo);
	gamePlayers[0].myTurn = true;
}

//Ends the turn of the current player and passes play to the next.
const endTurn = () => {
	gamePlayers[0].myActions.push(deckActions[0]);
	deckActions.shift();
	gamePlayers[0].actionCardPlayedInTurn = false;
	gamePlayers.reverse();
	gamePlayers[0].myTurn = true;
	gamePlayers[1].myTurn = false;
	if (gamePlayers[0].name === 'Player One'){
		$('#player1score').css('border', '4px dashed gold');
		$('#player2score').css('border', '1px solid gray');
	} else {
		$('#player1score').css('border', '1px solid gray');
		$('#player2score').css('border', '4px dashed gold');
	}
}

//Updates score tally for each player after a noble has
//been collected or some other event has occurred
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
	if (gamePlayers[0].name === 'Player One'){
		$('#p1score').text('Player One: ' + gamePlayers[0].score);
		$('#p2score').text('Player Two: ' + gamePlayers[1].score);
	} else {
		$('#p1score').text('Player One: ' + gamePlayers[1].score);
		$('#p2score').text('Player Two: ' + gamePlayers[0].score);
	}
}

//deploys all functions needed before first move
//deals out nobles, action cards, assigns players
const launchGame = () => {
	playerSelect();
	dealDay();
	dealActions();
}

//Starts the game after clicking a "Begin!" button
$('.starter').on('click', (e) => {
		$('.starter').remove();
		$('.opener').css('display', 'block');
		launchGame();
	});

//Employs and then discards a selected action card
const confirmationOperation = () => {
	$('.confirmationbutton').on('click', (e) => {
		//cancels operation if no action cards are clicked
		if ($('.actionHand').children().hasClass('clicked') === false){
			return 0;
		}
		//cancels operation if two or more action cards are clicked
		let failCheck = 0;
		for (i = 0; i < $('.actionHand').children().length; i++){
			if ($($('.actionHand').children()[i]).hasClass('clicked') === true){
				failCheck += 1;
				if (failCheck > 1){
					return 0;
				}
			}
		}
		//cancels operation if the action card must affect a noble card
		//and no noble cards are clicked
		for (i = 0; i < gamePlayers[0].myActions.length; i++){
			if ($($('.actionHand').children()[i]).hasClass('clicked') === true){
				window.fret = i;
			}
		}
		if ($('.nobleLine').children().hasClass('clicked') === false && gamePlayers[0].myActions[fret].takesNoble === true){
			return 0;
		}
		//cancels operation if action card has previously been used this turn
		if (gamePlayers[0].actionCardPlayedInTurn === true){
			return 0;
		}
		//carries out implementation and discard
		for (i = 1; i < gamePlayers[0].myActions.length; i++){
			if ($($('.actionHand').children()[i]).hasClass('clicked') === true){
				gamePlayers[0].myActions.unshift(gamePlayers[0].myActions[i]);
				gamePlayers[0].myActions.splice((i + 1), 1);
			}
		}
		gamePlayers[0].actionCardPlayedInTurn = true;
		gamePlayers[0].myActions[0].actionCard();
		discardedActions.push(gamePlayers[0].myActions[0]);
		gamePlayers[0].myActions.shift();
		if (discardedActions[discardedActions.length - 1] === gamePlayers[0].myActions[0]){
			discardedActions.pop();
		}
		$('.actionHand').empty();
		assembleActions();
		buttonFunction();
	})
}

//Adds noble to current player's score pile
//when button is clicked
$('#collector').on('click', (e) => {
	gamePlayers[0].takeNoble();
})

//Installing functionality for modals
const $modal = $('#myModal');

const $span = $($('#closeScore')[0]);

$span.on('click', (e) => {
    $modal.css('display', 'none');
    if (day < 3){
    	dealDay();
    }
});

const $modal2 = $('#infoModal');

const $span2 = $($('#closeInfo')[0]);

$span2.on('click', (e) => {
    $modal2.css('display', 'none');
    $('button').removeClass('clicked');
});