$(document).ready(function(){
    const questions = [
        {question: "Which country supported the Communist Party of China in their struggle for power in China?",
        options: ["Japan","USSR","Indonesia","France"],
        answerIndex: 1
        },
        {question: `In what year was the "Great Leap Forward" begun?`,
        options: ["1957", "1953", "1949", "1976"],
        answerIndex: 0
        },
        {question: `In what year did China first acquire nuclear weapons??`,
        options: ["1974", "1960", "1964", "1969"],
        answerIndex: 2
        },
        {question: `What was the name of the mainly teenage civilians that Chairman Mao Zedong called on to spread the Cultural Revolution through China?`,
        options: ["The Reformers", "The Red Guards", "The Boxers", "The Gang of Four"],
        answerIndex: 1
        },
        {question: `Who was first Premier of the People's Republic of China, who served from 1949 to 1976?`,
        options: ["Liu Shaoqi", "Mao Zedong", "Zhou Enlai", "Hua Guofeng"],
        answerIndex: 0
        },
        {question: `The death of which influential Chinese leader sparked the revolution that spread across China in 1989?`,
        options: ["Hu Yaobang","Mao Zedong","Li Peng","Deng Xiaoping"],
        answerIndex: 0
        },
        {question: `How did the Chinese communist leader Liu Shaoqi die?`,
        options: [ "Commited suicide","Wound from a battle","Assassination","Imprisonment in an isolation cell"],
        answerIndex: 3
        },
        {question: `What term is given to the ideas of Chinese Communism?`,
        options: ["Marxism", "Biaoism", "Duxiuism", "Maoism"],
        answerIndex: 3
        },
        {question: `In what year did Hong Kong again become part of China?`,
        options: ["1945", "1997", "1995", "2001"],
        answerIndex: 1
        },
        {question: `Who was China's Chief of Military when the People's Liberation Army was sent into Tiananmen Square, in Beijing, to deal with the student protests that were going on?`,
        options: ["Deng Xiaoping", "Jiang Zemin", "Mao Zedong", "Zhao Ziyang"],
        answerIndex: 0
        },
    ];
    let questionNum = 0;
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    const game = $("#game");
    const newGame = () => {
        $("#game").empty();
        questionNum = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        newQuestion();
    };
    const endGame = () => {
        game.append($("<h2>").text("Trivia session complete!"));
        game.append($("<div>").text("Your results are as follows:"));
        const correctDiv = $("<li>").text(`Correct: ${correct}`);
        const incorrectDiv = $("<li>").text(`Incorrect: ${incorrect}`);
        const unansweredDiv = $("<li>").text(`Unanswered: ${unanswered}`);
        game.append($("<ul>").append(correctDiv, incorrectDiv, unansweredDiv));
        game.append($("<h3>").text("Would you like to try again?"));
        const startButton = $(`<button class="start-button">Start Game</button>`)
        $("#game").append(startButton);
        startButton.on("click", newGame);
    }
    const newQuestion = () =>{
        if(questionNum === questions.length){
            endGame();
            return true;
        }
        const currentQ = questions[questionNum];
        questionNum++;
        let count = 10;
        const countDiv = $("<div>").addClass("counter").text(`Time Remaining: ${count}`);
        const questionDiv = $("<div>").addClass("question").text(currentQ.question);
        game.append(countDiv, questionDiv);
        for(let x = 0; x<currentQ.options.length;x++){
            game.append($("<div>").addClass(`option ${x}`).text(currentQ.options[x]));
        };
        const countdown = setInterval(function(){
            count--;
            //if question times out
            if(count===0){
                clearInterval(countdown);
                game.empty();
                unanswered++;
                game.append($("<div>").text(`Time's up! The correct answer was ${currentQ.options[currentQ.answerIndex]}.`));
                let resetTime = 3;
                const resetDiv = $("<div>").text(`Resetting in ${resetTime}`);
                game.append(resetDiv);
                const reset = setInterval(function(){
                    resetTime--;
                    if(resetTime===0){
                        game.empty();
                        clearInterval(reset);
                        newQuestion();
                    }
                    resetDiv.text(`Resetting in ${resetTime}`);
                }, 1000);
            }
            countDiv.text(`Time Remaining: ${count}`);
        }, 1000);
        $(".option").on("click", function(){
            clearInterval(countdown);
            game.empty();
            let selectedIndex = this.classList[1];
            //if correct
            if(selectedIndex==currentQ.answerIndex){
                correct++;
                game.append($("<h2>").text("Correct!"));
            }else{
                incorrect++;
                game.append($("<h2>").text("Incorrect."));
                game.append($("<div>").text(`The correct answer was "${currentQ.options[currentQ.answerIndex]}".`));
            }
            let resetTime = 3;
            const resetDiv = $("<div>").text(`Resetting in ${resetTime}`);
            game.append(resetDiv);
            const reset = setInterval(function(){
                resetTime--;
                if(resetTime===0){
                    game.empty();
                    clearInterval(reset);
                    newQuestion();
                }
                resetDiv.text(`Resetting in ${resetTime}`);
            }, 1000);
        }); 
    }
    const startButton = $(`<button class="start-button">Start Game</button>`)
    $("#game").append(startButton);
    startButton.on("click", newGame);
});


