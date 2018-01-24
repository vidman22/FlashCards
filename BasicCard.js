var inquirer = require("inquirer");
var fs = require('fs');
var cards = require('./basicCards.json');


function BasicCard(frontSide, backSide) {
	this.front = frontSide;
	this.back = backSide;
}

function createNewCard() {
inquirer.prompt([{
	type: "input",
	name:"frontSide",
	message:"Enter your question"
}, {
	type: "input",
	name: "backSide",
	message:"Enter the answer"
}]).then(function(inputs){
	var card =new BasicCard(inputs.frontSide, inputs.backSide);
	cards.push(card);

	var newCard = JSON.stringify(cards, null, '\t');
	fs.writeFile('./basicCards.json', newCard, function(err) {
		if (err) throw err;
		console.log("Done");
	})
	
}) 

}

createNewCard();