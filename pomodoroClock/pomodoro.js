//initialize to a "work state"
var work = 1;
var currentStatus, t;
var counting = 0;
var sound = document.getElementById("alertSound");
var workInput = parseInt($("#workTime").text());
var breakInput = parseInt($("#breakTime").text());

var timerMin;
// var timerMin = workInput - 1;
var timerSec = 60;

// initialize time to 25 min
$("#timeMin").text(workInput);

// change numbers in timer setting as user changes input
var changeTime = function() {
	switch ($(this).attr("id")) {
		case "workPlus":
			workInput++
			$("#workTime").text(workInput);
			$("#timeMin").text(workInput);
			break;
		case "workMinus":
			if (workInput === 1) {
				break;
			} else {
				workInput--
				$("#workTime").text(workInput);
				$("#timeMin").text(workInput);
			}
			break;
		case "breakPlus":
			breakInput++
			$("#breakTime").text(breakInput);
			break;
		case "breakMinus":
			if (breakInput === 1) {
				break;
			} else {
				breakInput--
				$("#breakTime").text(breakInput);
			}
			break;
	}
}

// control setting work/break length
$(".timeHandler").click(changeTime);

//start counting
$("#start").click(function() {
	timerMin = workInput - 1;
	$("#timeMin").text(timerMin);
	counting = 1;
	timedCount();
	$("#reset").attr("disabled", true);
});

//stop counting
$("#stop").click(function() {
	clearTimeout(t);
	counting = 0;
	$("#reset").attr("disabled", false);
});

// reset to user inputs if clicked
$("#reset").click(function() {
	clearTimeout(t);
	counting = 0;
	// timerMin = workInput-1;
	timerSec = 60;
	$("#timeMin").text(workInput);
	$("#timeSec").text("00");
	currentStatus = "Work";
	$("#meter").css("border", "4px solid #FF6347");
	$("#meter span").css("color", "#73AD21");
	$("#statusLabel").css("color", "#73AD21");
	$("#statusLabel").text(currentStatus);
})

//Big thanks to W3Schools tutorial on setInterval();
var timedCount = function() {
	//count down seconds
	if (timerSec != 0 && timerMin != 0) {
		timerSec--;
		//add zero in fron to nums <10
		timerMin = checkTime(timerMin);
		timerSec = checkTime(timerSec);
		$("#timeSec").text(timerSec);
	}
	// count down by minute
	else if (timerSec == 0 && timerMin != 0) {
		timerMin--;
		timerSec = 60;
		timerSec--;
		timerMin = checkTime(timerMin);
		timerSec = checkTime(timerSec);
		$("#timeMin").text(timerMin);
		$("#timeSec").text(timerSec);
	} else if (timerMin == 0 && timerSec != 0) {
		timerSec--;
		//add zero in fron to nums <10
		timerMin = "00";
		timerSec = checkTime(timerSec);
		$("#timeSec").text(timerSec);
		$("#timeMin").text(timerMin);

		//both are zero
	} else if (timerMin == 0 && timerSec == 0) {
		if (work) {
			work = 0;
			timerMin = breakInput - 1;
			timerSec = 60;
			updateMeter(timerMin);
			timedCount();
		} else {
			work = 1;
			timerMin = workInput - 1;
			timerSec = 60;
			updateMeter(timerMin);
			timedCount();
		}
	}
	t = setTimeout(function() {
		timedCount()
	}, 1000);
};

// format time to what we expect 00:00
function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function updateMeter(time) {
	sound.play();
	if (work) {
		currentStatus = "Work";
		$("#timeMin").text(time);
		$("#timeSec").text("00");
		$("#meter").css("border", "4px solid #FF6347");
		$("#meter span").css("color", "#73AD21");
		$("#statusLabel").css("color", "#73AD21");
	} else {
		currentStatus = "Break";
		$("#timeMin").text(time);
		$("#timeSec").text("00");
		$("#meter").css("border", "4px solid #73AD21");
		$("#meter span").css("color", "#FF6347");
		$("#statusLabel").css("color", "#FF6347");
	}
	$("#statusLabel").text(currentStatus);
}