function subBrLen() {
	var brTimer = document.getElementById("brTimerVal");
	
	if(parseInt(brTimer.textContent) > 1) {
		brTimer.innerHTML = parseInt(brTimer.textContent) - 1;
	}
	
	var watchText = document.getElementById("watchText").textContent;
	if(watchText == "Break!") {
		document.getElementById("liveCntDwn").innerHTML = brTimer.textContent;
	}
}

function addBrLen() {
	var brTimer = document.getElementById("brTimerVal");
	
		brTimer.innerHTML = parseInt(brTimer.textContent) + 1;
	var watchText = document.getElementById("watchText").textContent;
	if(watchText == "Break!") {
		document.getElementById("liveCntDwn").innerHTML = brTimer.textContent;
	}
}

function subtractSessLen() {
	var brTimer = document.getElementById("sessTimerVal");
	
	if(parseInt(brTimer.textContent) > 1) {
		brTimer.innerHTML = parseInt(brTimer.textContent) - 1;
	}
	
	var watchText = document.getElementById("watchText").textContent;
	if(watchText == "Session") {
		document.getElementById("liveCntDwn").innerHTML = brTimer.textContent;
	}
}

function addSessLen() {
	var brTimer = document.getElementById("sessTimerVal");
	
		brTimer.innerHTML = parseInt(brTimer.textContent) + 1;
	
	var watchText = document.getElementById("watchText").textContent;
	if(watchText == "Session") {
		document.getElementById("liveCntDwn").innerHTML = brTimer.textContent;
	}
}


$(function() {
   var state = document.getElementById("timer");
	var sessTime = parseInt(document.getElementById("liveCntDwn").textContent);
	var interval = null;
	var mins, secs, strSessTime, per, secsLeft, quantum;
    $("#play").click(function() {
      //if (interval !== null) return;
			sessTime = parseInt(document.getElementById("liveCntDwn").textContent);
			strSessTime = document.getElementById("liveCntDwn").textContent;

			if(strSessTime.indexOf(":")>0) {
				
			 	mins = strSessTime.split(":")[0]>0?strSessTime.split(":")[0]:strSessTime.split(":")[0];
				secs = strSessTime.split(":")[1];
			}
			else {
      	mins = sessTime>0?sessTime - 1:sessTime;
				secs = 60; 
			}
			secsLeft = (mins)*60 + secs;
			quantum = 250/secsLeft;
			per = 0;
		interval = setInterval(function() {
				//secsLeft = secsLeft - 1;	
				secs = secs - 1;
				if(secs == 0 && mins != 0) {
					mins = mins - 1;
				}
				
			//update clock time
				document.getElementById("liveCntDwn").textContent = mins + ":" + secs;
				document.getElementById("liveCntDwn").innerHTML = mins + ":" + secs;
			per = per+(quantum*100/250);
			$('#load-bar').css({background: "linear-gradient(to top, #FF5722 "+per+"%,transparent "+per+"%,transparent 100%)"});
				if(mins == 0 && secs == 0) {
					//one section is over, start another
					clearInterval(interval);
					var watchText = document.getElementById("watchText");
					if(watchText.textContent == "Session") {
						watchText.textContent = "Break!";
						watchText.innerHTML = "Break!";
					document.getElementById("liveCntDwn").textContent = document.getElementById("brTimerVal").textContent;
				document.getElementById("liveCntDwn").innerHTML = document.getElementById("brTimerVal").textContent;
						$('#play').trigger('click');
				}
					else {
						watchText.textContent = "Session";
						watchText.innerHTML = "Session";
					document.getElementById("liveCntDwn").textContent = document.getElementById("sessTimerVal").textContent;
				document.getElementById("liveCntDwn").innerHTML = document.getElementById("sessTimerVal").textContent;
						$('#play').trigger('click');
					}
				}
			
			},1000);
    });

    $("#pause").click(function() {
      clearInterval(interval);
    });
});
