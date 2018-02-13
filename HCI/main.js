$(window).scroll(function() {
	if ($(document).scrollTop() > 50) {
		$('nav').addClass('shrink');
	} else {
		$('nav').removeClass('shrink');
	}
});


class Player {
	constructor(name) {
		this.name = name;
		this.num_answers = 0;
		this.answers_selected = 0;
		this.pct_answered = 0;
		this.pct_of_total = 0;
	}
	
	countAnswersSelected() {
		var inputs = document.getElementsByClassName(this.name);
		if (inputs.length > 0) {
			for (var i = 0; i < inputs.length; i++)
				if (inputs[i].checked)
					this.answers_selected++;
			this.num_answers = inputs.length;
			this.pct_answered = (this.answers_selected/this.num_answers)*100;
		}
	}
	
	setPctOfTotal(total_pct) {
		this.pct_of_total = this.pct_answered/total_pct;
	}
	
	getInfo() {
		return (this.name.charAt(0).toUpperCase() + this.name.slice(1) + ": " + this.pct_answered.toFixed(2) +"%")
	}
}


function handleClick() {
	players = [new Player("andre"), new Player("aram"), new Player("peggy"), new Player("scott")];
	tot_pct = 0;
	for (var i = 0; i < players.length; i++) {
		players[i].countAnswersSelected();
		tot_pct += players[i].pct_answered;
	}
	var my_html = "";
	for (var i = 0; i < players.length; i++) {
		players[i].setPctOfTotal(tot_pct);
		my_html+=players[i].getInfo()+players[i].pct_of_total+" "+tot_pct+"<br>";
	}
	var container = document.getElementById('results');
	container.innerHTML = my_html;
}