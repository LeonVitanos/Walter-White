(function() {
  const myQuestions = [
    {
      question: "What distracts Walt from absorbing the news of his cancer diagnosis?",
      answers: {
        a: "The doctor has mustard on his coat.",
        b: "The has a lazy eye.",
        c: "Walt is stressing about money.",
		d: "Walt’s second cell phone is buzzing in his pocket."
      },
      correctAnswer: "a"
    },
    {
      question: "Walt doesn’t call it the meth game, though. He calls it…",
      answers: {
        a: "Making a living",
        b: "My family's nest egg",
        c: "The empire bussines",
		d: "Pure chemistry"
      },
      correctAnswer: "c"
    },
    {
      question: "What drug do we NOT see Jesse use?",
      answers: {
        a: "Heroin",
        b: "Meth",
        c: "Weed",
		d: "Ecstacy"
      },
      correctAnswer: "d"
    },
	{
      question: "Jesse’s girlfriend Andrea has a son. What’s his name?",
      answers: {
        a: "Bill",
        b: "Buck",
        c: "Brock",
		d: "Brick"
      },
      correctAnswer: "c"
    },
	{
      question: "What kind of R.V. do Walt and Jesse cook meth in?",
      answers: {
        a: "A Winnebago",
        b: "A Bounder",
        c: "A Mountaineer",
		d: "A Dutchman"
      },
      correctAnswer: "b"
    }
  ];

  function buildQuiz() {
	shuffle(myQuestions);

    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (var letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }
  
  function showResults() {
    checkIfCorrect();
    quizEnded=true;

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });


    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

    //hide submit button and show retry button
    submitButton.style.display = "none";
    retryButton.style.display = "inline-block";

    document.getElementById("funnyImage").style.visibility = "visible";
  }

  function retry(){  
    quizEnded=false;
      
    //hide retry button and results 
    retryButton.style.display = "none";
    resultsContainer.innerHTML = '';

    // for each question make the color white
    const answerContainers = quizContainer.querySelectorAll(".answers");
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      answerContainers[questionNumber].style.color = "white";
    });

    showSlide(0);
    document.getElementById("funnyImage").style.visibility = "hidden";
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      if(quizEnded==false)
        submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }
  
  function showNextSlide() {
    checkIfCorrect();
    showSlide(currentSlide + 1);
  }

  function checkIfCorrect()
  {
    if(quizEnded==false){
      clearTimeout(timer);
      const answerContainers = quizContainer.querySelectorAll(".answers");
      const answerContainer = answerContainers[currentSlide];
      const selector = `input[name=question${currentSlide}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      if (userAnswer === myQuestions[currentSlide].correctAnswer)
        document.getElementById('answer').innerHTML = 'Your answer was correct!';
      else if (userAnswer == {}.value)
        document.getElementById('answer').innerHTML = 'You selected nothing, the correct answer was: ' + myQuestions[currentSlide].correctAnswer ;
      else
        document.getElementById('answer').innerHTML = 'Your answer was wrong, the correct answer was: ' + myQuestions[currentSlide].correctAnswer ;
      
      document.getElementById("answer").style.visibility = "visible";
      timer = setTimeout(function(){ document.getElementById("answer").style.visibility = "hidden"; }, 2500);
    }
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  
  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
  
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const retryButton = document.getElementById("retry");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  retryButton.addEventListener("click", retry); 

  retryButton.style.display = "none";

  var timer; 
  var quizEnded=false;

  const elem = document.getElementById('answer');

})();