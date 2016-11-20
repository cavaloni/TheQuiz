var questionsandanswers  = [
	QandA1 = {
	question : "You produce about 500 to 1,500 milliliters of gas per day, and expel it in about how many farts?",
	answers : [ 
	"1 to 3",
	"10-20",
	"90-150",
	"1000-2000"],
	rightAnswer : 1 
},

QandA2 = {
	question : "How much of farts do not actually smell?",
	answers : [ 
	"90%",
	"50%",
	"20%",
	"100% (I'm perfect)"],
	rightAnswer : 0 
},

QandA3 = {
	question : "Gum and soda can make you fart more",
	answers : [ 
	"True",
	"False",
	"Depends",
	"Why are you asking this?"],
	rightAnswer : 0 
},

QandA4 = {
	question : "Farting is the result of a healthy, complex ecosystem in your intestines",
	answers : [ 
	"True",
	"False",
	"Depends",
	"Seriously...why."],
	rightAnswer : 0 
},

QandA5 = {
	question : "Why dont we mind the own smell of our farts?",
	answers : [ 
	"We become habituated to them",
	"Because it is kind of awesome",
	"Because my sh!@ dont stank",
	"I though I alread answered that I am perfect"],
	rightAnswer : 0 
},

QandA6 = {
	question : "Can you actually light a fart on fire?",
	answers : [ 
	"Yes",
	"No",
	"Yes, and it is dangerous",
	"All of the above"],
	rightAnswer : 2 
},

QandA7 = {
	question : "Can you hold in a fart until it dissapears?",
	answers : [ 
	"Yes",
	"No",
	"Depends on the size",
	"Yes, and it can cause internal damage"],
	rightAnswer : 1 
},

QandA8 = {
	question : "Is it best to starve the fart causing bacteria?",
	answers : [ 
	"Of course!",
	"Depends",
	"Of course not, its a sign of health!",
	"I was done with this test on question one"],
	rightAnswer : 2 
},

];

var questionnumber = 0;
var score = 0;

function handleStartQuiz () {
	$('.proceed-button').click(function (event) {
		drawQuestion (questionsandanswers[questionnumber].question);
		$('form').toggleClass("hidden");
		drawAnswers(questionsandanswers[questionnumber].answers);
		$('button.proceed-button').remove();
		drawSubmitButton();
		submitQuestion(questionsandanswers);
	})
}

function drawSubmitButton () {
	var newsubmitbutton = "<button name=\"next\" class=\"submit-button\">Submit</button>";
		$('#button-div').html(newsubmitbutton);
		displayQuizProgress();
		displayScore();
		$('.text-area').removeClass('green');
		$('.text-area').removeClass('red');
}

function drawQuestion (question) {
	$('.text-area').text(question);
}

function drawAnswers (answers) {
	var questionsList = [] 
	for (i = 0; i < answers.length; i++)
	{
		questionsList.push("<input type=\"radio\" name=\"radios1\" value=\"" +i+ "\" checked>" + answers[i] + "<br>");
	};
	$('form').html(questionsList);
};

function submitQuestion (QandA) {
	$(document.body).on('click', '.submit-button', function (event){
		var response = ($('input[name=radios1]:checked', '.answers-form').val()); 
		if (response == QandA[questionnumber].rightAnswer) {
			drawCorrect();
			questionnumber++;
			score++;
		}
		else {
			drawIncorrect();
			questionnumber++;
			
		};		
	});
};

function drawCorrect () {
	$('.text-area').addClass('green');
	$('.text-area').text("Correct!");
	nextButton();
}

function drawIncorrect () {
	var correctAnswer = questionsandanswers[questionnumber].rightAnswer;
	$('.text-area').addClass('red');
	$('.text-area').html("Nope! </br> Correct Answer: " + questionsandanswers[questionnumber].answers[correctAnswer] );
	nextButton();
};

function nextButton () {
	$('#button-div').html("<button name=\"next-question\" class=\"next-button\">Next</button>");
	$(document.body).on('click', '.next-button', function (event) {
		var numberofQuestions = questionsandanswers.length;
		console.log(numberofQuestions);
		console.log(questionnumber);
		if (questionnumber >= numberofQuestions) {
			finalPage();
		}
		else { 
			drawQuestion(questionsandanswers[questionnumber].question);
			drawAnswers(questionsandanswers[questionnumber].answers);
			drawSubmitButton();
		}
		console.log(questionnumber);
		});
};


function displayQuizProgress () {
	// $('#button-div').append("<div class=\"counter\">words</div>");
	$('.counter').text("Question #"+(questionnumber + 1));
}

function displayScore () {
	var currentScore = score + " out of 8 correct";
	$('.score').text(currentScore);
}

function finalPage () {
	$('.text-area').removeClass('green');
	$('.text-area').removeClass('red');
	$('.text-area').html("Way to make it all the way through, you beautiful smelly healthy person you. Final score: </br>" + score + " out of 8");
	$('form').html("");
	$('.counter').text("");
	$('.score').text("");
	startOverButton();
}

function startOverButton () {
	$('#button-div').html("<button name=\"next-question\" class=\"start-over\">Start Over</button>");
	$(document.body).on('click', '.start-over', function (event) {
		questionnumber = 0;
		score = 0;
		drawQuestion (questionsandanswers[questionnumber].question);
		drawAnswers(questionsandanswers[questionnumber].answers);
		drawSubmitButton();
		submitQuestion(questionsandanswers);
	});
}

handleStartQuiz();



$(document).ready;