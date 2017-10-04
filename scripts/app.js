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
		const $h3 = $('<h3/>');
		$h3.text(queueNobles[i].name);
		$newdiv.append($h3);
		$newdiv.addClass('inLine');
		$newdiv.addClass(queueNobles[i].color);
		$('.nobleLine').append($newdiv);
	}
	if (queueNobles.length === 0){
		$('#myModal').css('display', 'block');
		if (day < 3){
			$('#score-update').text('At the end of day ' + day + ', ' + gamePlayers[0].name + ' has collected ' 
			+ gamePlayers[0].myNobles.length + ' nobles and scored ' + gamePlayers[0].score + ' points. ' 
			+ gamePlayers[1].name + ' has collected ' + gamePlayers[1].myNobles.length 
			+ ' nobles and scored ' + gamePlayers[1].score + ' points.')
		} else if (day === 3 && gamePlayers[0].score > gamePlayers[1].score){
			$('#score-update').text('At the end of the final day, ' + gamePlayers[0].name + ' has collected ' 
			+ gamePlayers[0].myNobles.length + ' nobles and scored ' + gamePlayers[0].score + ' points. ' 
			+ gamePlayers[1].name + ' has collected ' + gamePlayers[1].myNobles.length 
			+ ' nobles and scored ' + gamePlayers[1].score + ' points. ' + gamePlayers[0].name + ' is the winner!')
		} else if (day === 3 && gamePlayers[1].score > gamePlayers[0].score){
			$('#score-update').text('At the end of the final day, ' + gamePlayers[0].name + ' has collected ' 
			+ gamePlayers[0].myNobles.length + ' nobles and scored ' + gamePlayers[0].score + ' points. ' 
			+ gamePlayers[1].name + ' has collected ' + gamePlayers[1].myNobles.length 
			+ ' nobles and scored ' + gamePlayers[1].score + ' points. ' + gamePlayers[1].name + ' is the winner!')
		} else if (day === 3 && gamePlayers[0].score === gamePlayers[1].score){
			$('#score-update').text('At the end of the final day, ' + gamePlayers[0].name + ' has collected ' 
			+ gamePlayers[0].myNobles.length + ' nobles and scored ' + gamePlayers[0].score + ' points. ' 
			+ gamePlayers[1].name + ' has collected ' + gamePlayers[1].myNobles.length 
			+ ' nobles and scored ' + gamePlayers[1].score + ' points. Tie game!')
		}
	}
	buttonFunction();
	buttonRefunction();
};

//Allows noble cards to be selected for modification
//by action cards
const buttonFunction = () => {
	$('.inLine').on('click', (e) => {
		$(e.target).addClass('clicked');
		buttonRefunction();
	});
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
	gamePlayers.reverse();
	gamePlayers[0].myTurn = true;
	gamePlayers[1].myTurn = false;
	if (gamePlayers[0].name === 'Player One'){
		$('#player1score').css('border', '2px dashed purple');
		$('#player2score').css('border', '1px solid gray');
	} else {
		$('#player1score').css('border', '1px solid gray');
		$('#player2score').css('border', '2px dashed purple');
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

//Installing functionality for modal
const $modal = $('#myModal');

const $span = $($('.close')[0]);

$span.on('click', (e) => {
    $modal.css('display', 'none');
    if (day < 3){
    	dealDay();
    }
});