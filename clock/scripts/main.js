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

displayTime();

setInterval(displayTime, 500);
