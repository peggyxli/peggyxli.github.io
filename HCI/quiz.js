class Player {
	constructor(name) {
		this.class_name = name;
		this.name = name.charAt(0).toUpperCase() + name.slice(1);
		this.num_answers = 0;
		this.answers_selected = 0;
		this.pct_answered = 0;
		this.pct_of_total = 0;
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
	
	setPctOfTotal(total_pct) {
		this.pct_of_total = (this.pct_answered/total_pct)*100;
	}
	
	getInfo() {
		let my_html = this.name + ": " + this.pct_answered.toFixed(2)  + "%<br>";
		my_html += "<div style=\"background-color: red; height: 10px; width:" + this.pct_of_total + "%\"></div><br>"
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
	/* var error_found = checkForErrors(my_quiz);
	if (error_found) {
		setTimeout(function() { alert("Quiz incomplete: Please make a selection in every row"); }, 100);
	}
	else { */
		var my_html = "";
		var players = [new Player("andre"), new Player("aram"), new Player("peggy"), new Player("scott")];
		var tot_pct = 0;
		for (var i = 0; i < players.length; i++) {
			players[i].countAnswersSelected();
			tot_pct += players[i].pct_answered;
		}

		for (var i = 0; i < players.length; i++)
			players[i].setPctOfTotal(tot_pct);

		players.sort(function(a,b){return b.pct_of_total - a.pct_of_total});
		
		for (var i = 0; i < players.length; i++)
			my_html+=players[i].getInfo();
		document.getElementById("results").innerHTML = my_html;
	/* } */
}
