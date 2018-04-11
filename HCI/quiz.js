class Player {
	constructor(class_name, name, img_url, description, img_source) {
		this.class_name = class_name;
		this.name = name.charAt(0).toUpperCase() + name.slice(1);
		this.image_url = img_url;
		this.description = description;
		this.image_source = img_source;
		this.num_answers = 0;
		this.answers_selected = 0;
		this.pct_answered = 0;
	}
	
	countAnswersSelected() {
		var inputs = document.getElementsByClassName(this.class_name);
		if (inputs.length > 0) {
			for (var i = 0; i < inputs.length; i++)
				if (inputs[i].checked)
					this.answers_selected++;
			this.num_answers = inputs.length;
			this.pct_answered = (this.answers_selected/this.num_answers)*100;
		}
	}
	
	getInfo() {
		let my_html = this.name + ": " + this.pct_answered.toFixed(2)  + "%<br>";
		my_html += "<div class=\"bar-outer bg-light\"><div class=\"bar-inner\" style=\"width:" + this.pct_answered + "%\"></div></div>"
		return my_html;
	}
}


function checkForErrors(my_quiz) {
	var error_found = false;
	var rows = my_quiz.rows;
	for (var i = 0; i < rows.length; i++) {
		let inputs = rows[i].getElementsByTagName("input");
		if (inputs.length > 0) {
			var text_cell = rows[i].cells[0];
			if (!inputs[0].checked && !inputs[1].checked) {
				text_cell.className = "red-text";
				error_found = true;
			}
			else
				text_cell.className = "";
		}
	}
	return error_found;
}


function submitQuiz() {
	var my_quiz = document.getElementById("quiz-table");
	var error_found = checkForErrors(my_quiz);
	if (error_found) {
		setTimeout(function() { alert("Quiz incomplete: Please make a selection in every row"); }, 100);
	}
	else {
		var players = [new Player("andre", "thudd", "Thudd.png", "Thudd big rock. Thudd smash! Thudd go where Penny go.",
								  "<a href=\"http://maplestory.wikia.com/wiki/Castle_Golem\">MapleStory - Castle Golem,</a> "+
								  "<a href=\"http://www.thefullwiki.org/MapleStory/Monsters/Level_31-40\">MapleStory - Penguin</a>"),
					   new Player("aram", "luc", "Luc.jpg", "Luc is a chill halfling whose interests include pineapples, gold, and revenge.",
								  "<a href=\"https://lissybeth123.deviantart.com/art/RU-FI-OOOOOoooooooo-413184166\">lissybeth123 - Rufio</a>"), 
					   new Player("peggy", "penny", "Penny.png" , "Penny is an adorable penguin who likes to throw acorns and set things on fire.",
								  "<a href=\"http://www.theargus.co.uk/news/15417527.Thunderstorm_and_hail_warning_for_Sussex_issued_by_Met_Office\">The Argus - Lightning,</a> "+
								  "<a href=\"https://khl1997.deviantart.com/art/Fluffal-Penguin-690239491\">Kai1411 - Fluffal Penguin</a>"),
					   new Player("scott", "lyl", "Lyl.jpg", "Lyl is a mysterious person who wouldn't give me a description of himself.",
								  "<a href=\"https://claparo-sans.deviantart.com/art/Edricane-547043882\">Claparo-Sans - Edricane</a>")];

		for (var i = 0; i < players.length; i++)
			players[i].countAnswersSelected();
		players.sort(function(a,b){return b.pct_answered - a.pct_answered});
		var my_html = "";
		for (var i = 0; i < players.length; i++)
			my_html+=players[i].getInfo();
		document.getElementById("all-results").innerHTML = my_html;	
			
		if (document.getElementsByClassName("eugene")[0].checked) {//hidden easter egg
			var snd = new Audio("thunder.mp3");
			snd.play();
			players[0] = new Player("eugene", "eugene", "Eugene.gif", "You are the all-knowing DM who sets up the game, controls the NPCs, and guides the <s>idiots</s> players.",
									"<a href=\"https://giphy.com/gifs/orb-fQIscqiDqDF1m\">GIPHY - Orb GIF</a>");
		}
		document.getElementById("result-name").innerHTML = "You are " + players[0].name + ".";
		document.getElementById("result-description").innerHTML = players[0].description;
		document.getElementById("result-image").innerHTML = "<img src=\""+players[0].image_url+"\">";
		document.getElementById("image-source").innerHTML = "<span>Image source(s): " + players[0].image_source + "</span>";

		$("#quiz-modal").modal();
	}
}


function pumpkinPopup() {
	document.getElementById("result-name").innerHTML = "What is wrong with you?!"
	document.getElementById("result-image").innerHTML = "<img src=\"Pumpkin.jpg\">";
	document.getElementById("result-image").className = "col-sm-6";
	$("#quiz-modal").modal();
}