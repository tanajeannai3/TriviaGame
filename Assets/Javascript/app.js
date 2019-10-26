$(document).ready(function () {
    var correct = 0;
    var incorrect = 0;
    var unanswered =  0;
    var userAnswer = "";
    var timer = 20;
    var timerOn = false;
    var intervalidId;
    var qCount = options.length;
    var pick;
    var index;
    var holder = [];

    var options = [
    {
        question: "What is Travis Scott birth name?", 
        choice: ["Jacques Webster", "James Webster", "Jacquees", "Johnathon Webster"],
        answer: 0,
    }, 
    {
        question: "What year was Travis Scott born?", 
        choice: ["1999", "1991", "1980", "1998"],
        answer: 1,
    },
    {
        question: "What city is Travis Scott from?", 
        choice: ["Dallas","Lubbock","Houston","Austin"],
        answer: 2,
    },
    {
        question: "What college did Travis attend?", 
        choice: ["Univeristy of Houston","Texas Tech","Texas A&M","UTSA"],
        answer: 3,
    },
    {
        question: "'Travis Scott has a daughter with Kylie Jenner'", 
        choice: ["True","False"],
        answer: 0,
    },
    {
        question: "What is Travis Scott daughter name?", 
        choice: ["Dream","Stormi","Regin","North"],
        answer: 1,
    },
    {
        question: "What does HITR mean?", 
        choice: ['Highest in the room','Hater in the room','High in the room','Highest in the Rule'],
        answer: 0,
    }];

    $("#rest").hide();

    $("#start").on("click", function () {
        $("#start").hide();
		displayQuestion();
        runTimer();
        for(var i = 0; i < options.length; i++) {
            holder.push(options[i]);
            console.log(options);
    }

    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
        if (timer === 0) {
            unanswer++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        }	
    }
    
    function runTimer(){
        if (!timerOn) {
        intervalidId = setInterval(decrement, 1000); 
        timerOn = true;
        }
    }

    function stop() {
        timerOn = false;
        clearInterval(intervalidId);
    }

    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for(var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
    }
    
    $(".answerchoice").on("click", function () {
        userAnswer = parseInt($(this).attr("data-guessvalue"));
        if (userAnswer === pick.answer) {
            stop();
            correct++;
            userAnswer="";
            $("#answerblock").html("<p>Correct!</p>");    
        } else {
            stop();
            incorrect++;
            userAnswer="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        }
    })}
    
    if ((incorrect + correct + unanswered) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correct + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + incorrect + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswered + "</h4>" );
		$("#reset").show();
		correct = 0;
		incorrect = 0;
        unanswered = 0;
    } else {
		runTimer();
        displayQuestion();
    }}, 3000);

    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })
});
