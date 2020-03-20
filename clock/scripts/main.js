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
	catMessage.innerText = "WHYYY";
	catMessage.style.color = 'black';
	catMessage.style.left = '50%';
	catMessage.style.fontSize = '500px';

	// for(var i = 0; i <= 10; i++){
	// 	setTimeout(function () {
	// 		catMessage.style.fontSize = 'larger';
	// 		console.log('loop');
	// 	}, 3000);
	// }
}

displayTime();
timeToEat();

setInterval(displayTime, 500);
