let day = 0;

const queueNobles = [];

const discardNobles = [];

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
	shuffle(deckNobles);
	for (let i = 0; i < 12; i++){
		queueNobles.push(deckNobles[i]);
	}
	for (let i = 0; i < 12; i++){
		deckNobles.shift();
	}
};

class Player {
	constructor(name){
		this.name = name;
		this.score = 0;
		this.myNobles = [];
		this.myTurn = true;
		this.greenPlusOne = false;
		this.grayEqualsOne = false;
		this.actionCardBanned = false;
		this.redPlusOne = false;
		this.bluePlusOne = false;
		this.palaceGuardsCollected = 0;
		this.grayCardsCollected = 0;
		this.countCollected = false;
		this.countessCollected = false;
	};
	playCard(){

	};
	takeNoble(){
		let x = queueNobles[0].points;
		console.log(x);
		console.log(this.score);
		this.score = this.score + x;
		this.myNobles.push(queueNobles[0]);
		queueNobles.shift();
	}
}

//ACTION CARD FUNCTIONS

//Action Card: Mass Confusion
const newLine = () => {
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
}

//Action Card: 
const 