var inquirer = require('inquirer');
var fs = require('fs');

var cards = require('./clozeCards.json')

function ClozeCard(fullText, answer) {
	var clozePositions = clozeDelete(fullText, answer);

	this.partial = getPartial(fullText, clozePositions);

	this.answer = answer;


	function clozeDelete(fullText, answer) {
		var start = fullText.indexOf(answer);
		if (start !== -1){
			return [start, start + answer.length];
		}
		throw new Error("Not found");
	}

	function getPartial(fullText, clozePositions){
		var start = fullText.slice(0, clozePositions[0]);
		var end = fullText.slice(clozePositions[1], fullText.length);
		return start + " ... "+ end;
	}
}

ClozeCard.prototype.displayCard = function displayCard(){
	console.log(this.partial.replace("...", this.answer))
}

function createNewCard() {
	inquirer.prompt([{
		type: "input",
		name:"fullText",
		message:"Enter your question"
	}, {
		type: "input",
		name: "answer",
		message:"Enter the answer"
	}]).then(function(inputs){
		var card = new ClozeCard(inputs.fullText, inputs.answer);
		card.displayCard();
		console.log(card);
		cards.push(card);

		var newCard = JSON.stringify(cards, null, '\t');
		fs.writeFile('./clozeCards.json', newCard, function(err) {
			if (err) throw err;
			console.log("Done");
		})
		
	  }) 
}
createNewCard();