// Full sequence on rearrangeNobles:
//player gets noble
gamePlayers[0].myNobles.push(queueNobles[0]);
queueNobles.shift();
//player gets new action card
gamePlayers[0].myActions.push(deckActions[0]);
deckActions.shift();
gamePlayers[0].actionCardPlayedInTurn = false;
//player's turn ends
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
//bookkeeping
retotalPoints();
$('.nobleLine').empty();
assembleNobles();
$('.actionHand').empty();
assembleActions();
//noble queue gets shuffled
shuffle(queueNobles);
$('.nobleLine').empty();
assembleNobles();

//list to test
"Information Exchange"