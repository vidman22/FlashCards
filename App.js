var inquirer = require("inquirer");

function BasicCard = function(frontSide, backSide) {
	this.front = frontSide;
	this.back = backSide;
}

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
	console.log(card);
})