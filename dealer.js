//constructor
var CardGame = function () {
  //member variables
  this.deck = new Deck();
  //player could be made array in future.
  this.player = new Hand("Player");
  this.dealer = new Hand("Dealer");
  this.status = GameStatus.STOPPED;
};


//member methods
CardGame.prototype.startGame = function () {
    console.log("Hello, I'm ");
	 
     
	 //Initialize deck and shuffle
	 this.deck.setup();
	 this.deck.shuffle();
	 this.deck.printDeck();
	 
	 this.status = GameStatus.STARTED;
	 //distribute two cards each to dealer and player
    //var deck = Object.create(Deck); //with this constructor function is not called
    //console.log(deck.Deck());
    
	this.distributeCards(this.player, 2);
	this.distributeCards(this.dealer, 2);
	console.log("cards length after removing two" + this.deck.getCount());
	
	//console.log("Player status" + this.player.getStatus());
	
		this.evaluatePlayerStatus();		
};

var GameStatus = { STARTED:"started", STOPPED:"stopped"}


CardGame.prototype.evaluatePlayerStatus = function() {
      var currentPlayerStatus = this.player.getStatus();
	  console.log("Player status" + currentPlayerStatus);
	if(currentPlayerStatus == HandStatus.INGAME || currentPlayerStatus == HandStatus.STAND){
	    console.log("In Game. enable hit, stand. ");
	} else if(currentPlayerStatus == HandStatus.BLACKJACK){
	    console.log("Player wins . BlackJack . Disable hit, stand.");
	} else {
	   console.log("Dealer WINS. Player busted, Disable hit, stand. ");
	}
};

CardGame.prototype.Hit = function(hand){
  
  if(hand == undefined) {
     hand = this.player;
	}
  console.log("hit called by " + hand.name);
  this.distributeCards(hand, 1);
  if(hand.name == "Dealer"){
    this.evaluateDealerStatus();
  }else{
    this.evaluatePlayerStatus();
	}
  
};

CardGame.prototype.Stand = function(){
  console.log("stand called");
   this.evaluateDealerStatus();
 //this.evaluatePlayerStatus();
  
  };
  
  CardGame.prototype.evaluateDealerStatus = function() {
      var currentDealerStatus = this.dealer.getStatus();
	  console.log("Dealer status :" + currentDealerStatus);
	if(currentDealerStatus == HandStatus.BUSTED){
	    console.log("Player WINS. Dealer busted. Enable Start game button and disable hit, stand. ");
	    
	} else if(currentDealerStatus == HandStatus.BLACKJACK){
	    console.log("Dealer wins . BlackJack . Enable Start game. Disable hit, stand.");
	} else if(currentDealerStatus == HandStatus.STAND){
	      var dealerScore = this.dealer.getScore();
		  var playerScore = this.player.getScore();
		  console.log("dealer score" + dealerScore + "playerscore: " + playerScore);
		  if(dealerScore > playerScore){
		      console.log("Dealer wins . Enable Start game. Disable hit, stand.");
		  } else if(dealerScore == playerScore){
		       console.log("Tie. Enable Start game. Disable hit, stand.");
		  } else{
		      this.Hit(this.dealer);
		  }
	} else {
	    this.Hit(this.dealer);
	}
};





CardGame.prototype.distributeCards = function(hand,count){
     console.log("Giving " + count + " cards to " + hand.name);
	 var cardsAvail = this.deck.length;
	 if(cardsAvail < count){
	    console.log("Not enough cards to distribute to " + hand.name);
		return;
	} else {
	    for(var i = 0;i< count;i++){
            var nextCard = this.deck.getNextCard();
			hand.addCard(nextCard);
            //var nextCard = getNextCard(deck.cards);
            console.log(i+1 + " " + faceValue[nextCard.faceValue] + " " + nextCard.suitType);
        }
	}
       
};




var Card = function (value,suit) {
    this.faceValue = value;
    this.suitType = suit;
    this.isIssued = false;
};

var Suit = function (suit) {
    this.suitType = suit;
};

var SuitType = { DIAMOND: 0, HEART: 1, SPADE: 2, CLUB: 3 };

var faceValue = {
ace: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
    nine: 9, ten: 10, jack: 10, queen: 10, king: 10
};
/*var Deck = function () {
    var cards = [];

    
    for (var st in SuitType) {
        for (var fv in faceValue) {
            // console.log(fv + st);
            cards.push(new Card(fv, st));
            
        }
        // more statements
    }

    for (var i=0; i< cards.length;i++) {
        console.log(i +" " +  cards[i].faceValue + " " + cards[i].suitType);
    }
};*/

//Deck class
var Deck = function() {
    //member variables
    this.cards = [];
    
    //constructor methods
	this.setup = function(){
		console.log("Deck constructor called");
		for (var st in SuitType) {
			for (var fv in faceValue) {
			//for(var i = 0;i<faceValue.length ;i++){
				 console.log(fv + st);
			//	this.cards.push(new Card(faceValue[i], st));
			this.cards.push(new Card(fv,st));

			}
			// more statements
		}

		/*for (var i = 0; i < this.cards.length; i++) {
			console.log(i + " " + this.cards[i].faceValue + " " + this.cards[i].suitType);
		}
		for(var card in this.cards){
		   console.log(card.faceValue + card.suitType);
		}*/
	
	}
	
	this.printDeck = function(){
		for (var i = 0; i < this.cards.length; i++) {
			console.log(i + " " + this.cards[i].faceValue + " " + this.cards[i].suitType);
		}
	
	}

	this.getNextCard = function() {
	   // console.log("Deck: Get Card");
		var len = this.cards.length;
		var nextCard;
		if (len > 0) {
			nextCard = this.cards[len - 1];
			//deck.cards[i].isIssued = true;
			this.cards.splice(len - 1, 1);

		}
		return nextCard;
	}
	
	this.getCount = function() {
	    return this.cards.length;
	}
	
	this.shuffle = function () {
	    for (i=0; i< this.cards.length; i++)
	    {
	        randomIndex = Math.floor(Math.random() * this.cards.length);
	        temp = this.cards[i];
	        this.cards[i]= this.cards[randomIndex];
	        this.cards[randomIndex] = temp;
	    }	  
    }
    
};


/*
function Deck() {

    for (var st in SuitType) {
        for (var fv in faceValue) {
            // console.log(fv + st);
            cards.push(new Card(fv, st));

        }
        // more statements
    }

    for (var i = 0; i < cards.length; i++) {
        console.log(i + " " + cards[i].faceValue + " " + cards[i].suitType);
    }

}*/


