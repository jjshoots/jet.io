function displayTime(){
	var timeSpace = document.getElementById('timeSpace');

	var currentTime = new Date();

	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	var meridian = "AM";

	if(hours >= 12){
		meridian = "PM";
		if(hours > 12){
			hours = hours - 12;
		}
	}

	if(minutes < 10){ minutes = "0" + minutes; }

	if(seconds < 10){
		seconds = "0" + seconds;
	}

	var timeText = hours + ":" + minutes + ":" + seconds + " " + meridian;
    timeSpace.innerText = timeText;
}

function timeToEat(){
	var currentTime = new Date();
	if(12 <= currentTime.getHours() && currentTime.getHours() <= 18 ||
		18 <= currentTime.getHours() && currentTime.getHours() <= 21){
		var catMessage = document.getElementById('catMessage');
		var randNum = Math.floor(Math.random() * 4);
		switch(randNum){
			case 0:
				catMessage.innerText = "Hello have you eaten?";
				break;
			case 1:
				catMessage.innerText = "Jiak Beng Bo?";
				break;
			case 2:
				catMessage.innerText = "Did you bon apetit-ed?";
				break;
			case 3:
				catMessage.innerText = "你吃过了没？";
				break;

		}
	}else{
		var buttons = document.getElementById('buttonArea');
		buttons.remove();
	}
}

function yesClick(){
	var buttons = document.getElementById('buttonArea');
	buttons.remove();

	var randNum = Math.floor(Math.random() * 2);
	switch(randNum){
		case 0:
			document.getElementById('catImage').src = "./assets/img/patcat.jpg";
			break;
		case 1:
			document.getElementById('catImage').src = "./assets/img/smilecat.jpg";
			break;
	}

	var parent = document.getElementById('catParentContainer'); // Element that holds the mover
	var mover = document.getElementById('catImage'); // The mover, can be anything
	var dir = 1; // The direction we are moving... 1 is right, -1 is left.
	var dist = 10; // The distance we move each "tick"

	// The ID will let us stop it later if we want.
	var intervalId = setInterval(function() {
	    // Get the left, remove the "px" from the end and convert it to an integer.
	    var posX = parseInt(mover.style.left.replace(/px$/, '')) || 0;

	    // Add dir * dist
	    posX += dir * dist;

	    // If we are moving right and we've gone over the right edge...
	    if (dir == 1 && posX + mover.offsetWidth > parent.offsetWidth) {
	        // only move right to the edge...
	        posX -= posX + mover.offsetWidth - parent.offsetWidth;
	        // and change direction.
	        dir *= -1
	    // If we are moving left and we've gone over the left edge...
	    } else if (dir == -1 && posX < 0) {
	        // stop at zero...
	        posX = 0;
	        // and change direction...
	        dir *= -1;
	    }

	    // Set the new position
	    mover.style.left = posX + "px";
	}, 100);

	var catMessage = document.getElementById('catMessage');

	var catMessage = document.getElementById('catMessage');
	catMessage.innerText = "YAS!";
	catMessage.style.color = 'black';
	catMessage.style.left = '0';
	catMessage.style.width= '100%';

	(function expandingWhy () {          
		setTimeout(function () {
			var randNum = Math.floor(Math.random() * 500);
			catMessage.style.fontSize = randNum  + 'px';               
			expandingWhy();
		}, 50)
	})();   
}

function noClick(){
	var buttons = document.getElementById('buttonArea');
	buttons.remove();

	var randNum = Math.floor(Math.random() * 2);
	switch(randNum){
		case 0:
			document.getElementById('catImage').src = "./assets/img/cryingkitten.jpg";
			break;
		case 1:
			document.getElementById('catImage').src = "./assets/img/cursedcat.jpg";
			break;
	}
	
	var catMessage = document.getElementById('catMessage');

	var catMessage = document.getElementById('catMessage');
	catMessage.innerText = "WHYYY";
	catMessage.style.color = 'black';
	catMessage.style.left = '0';
	catMessage.style.width= '100%';

	var maxFontSize = 1000;

	(function expandingWhy (i) {          
		setTimeout(function () {
			catMessage.style.fontSize = (maxFontSize - i)  + 'px';               
			if (--i) expandingWhy(i);
		}, 20)
	})(maxFontSize);   
}

displayTime();
timeToEat();

setInterval(displayTime, 500);
