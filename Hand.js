var Hand = function(name) {
    //member variables
   // this.cards = [];
	this.name = name;
	//private member
	var status = HandStatus.INGAME;
	var cards = [];
    var currentScore = 0;
	var scoredCardsCnt = 0;
	
    //private methods
	function calculateScore() {
		//console.log("Deck constructor called");
		var score = 0;
		//var noOfAces = 0;
		var haveAce = false;
		console.log("total cards with hand" + cards.length);
		for (var i =0; i < cards.length;  i++) {
		     // if(card.faceValue == faceValue.ace)
		     /*if(card.faceValue == faceValue.ace){
		       noOfAces = noOfAces + 1;
			 }*/
			// console.log("facevalue: " + cards[i].suitType + cards[i].faceValue);
			 
			// console.log("faceValue.ace :" + faceValue.ace);
			 var cardScore = faceValue[cards[i].faceValue];
			 if(cardScore == faceValue.ace){
			    haveAce = true;
			 }
			 score += cardScore;
		}
		
		if((score + 10 <= 21) && haveAce){
		    score += 10;
		}
		console.log("current score of " + name + " is " + score);
		//return score;
		currentScore = score;
	}
	
	
	function evaluateStatus(){
		//var crntScore = getScore();
		calculateScore();
         console.log("evaluateStatus:: "+ currentScore);
		if(currentScore> 21){
			status = HandStatus.BUSTED;
		} else if(currentScore==21){
			status = HandStatus.BLACKJACK;
		} else if(currentScore >=17 && currentScore <=20){
			status = HandStatus.STAND;
		} else{
			status = HandStatus.INGAME;
		}
		//console.log("status" + this.status);
	}
	
	//privileged method
	this.getStatus = function(){
		evaluateStatus();
		console.log("status" + status);
		return status;
	};
	
	this.addCard = function(newCard){
	  cards.push(newCard);
	}
	
	this.getScore = function(){
	    if(scoredCardsCnt <cards.length){
		   calculateScore();
		   scoredCardsCnt = cards.length;
		} 
		    return currentScore;
		
	}
		
}

 //public methods
	

var HandStatus = {
      BLACKJACK: "blackjack",
      BUSTED: "busted",
	  STAND: "stand",
      INGAME: "ingame"
    };