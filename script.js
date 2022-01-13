

  //VAR scoreData =

//FUNCTION motd: When I load the page
    //Random fact is pulled from API
    //Display DOM element

//CALL motd

//FUNCTION openTrivia: When I input data to the form
    //Relevant data is pulled from Open Trivia API
    //Data is given attr to stylize as card

//FUNCTION openTriviaScore: When I get an answer correct
    //IF answer === correct
        //ALERT 'Correct!'
        //FUNCTION displayScore: When my score rises
            //scoreData is updated and displayed on the page
    //IF answer !== 'Correct'
        //ALERT 'False!'
        //CLEAR scoreData

//FUNCTION randomFact: When I input data to Input2
    //Relevant data is pulled from Random Useless Facts API
    //Data is given attr to stylize as card

//FUNCTION randomButton: When I want a random fact
    //Random data is pulled from Random Useless Facts API
    //Data is given attr to stylize as card

//EVENTLISTENER submitButton (openTrivia, randomFact): When I click 'Submit'
    //Relevant data from both APIs is displayed on page
    //openTrivia, randomFact given attr 'hidden'
    //randomButton given attr 'hidden'
    //submitButton given attr 'hidden'
    //goBack button remove attr 'hidden'

//EVENTLISTENER goBack:
    //goBack given attr 'hidden'
    //openTrivia, randomFact given attr 'hidden'
    //submitButton remove attr 'hidden'
    //randomButton remove attr 'hidden'

//EVENTLISTENER randomFact (randomButton):
    //Random data from Random Useless Fact API is displayed on submitPage.html
$('.dropdown-trigger').dropdown();

$(document).ready(function(){
    $('select').formSelect();
})

//Modal -Ben
$(document).ready(function(){
    function openModal() {
        $('.modal').modal();
        $('.modal').modal('open')
        fetch(factUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $('#helpful-hint').text(data.text)
    });
    }
    function askMore() {
        $('.modal').modal('close')
        openModal()
    }

    document.querySelector('.modal-trigger').addEventListener('click', openModal)
    document.querySelector('.ask-more').addEventListener('click', askMore)
  });

  function hideAll() {
    $('.page-load').attr('style', 'display: none')
    $('.trivia-selections').attr('style', 'display: none')
    $('.game-play').attr('style', 'display: none')
    $('.end-of-game').attr('style', 'display: none')
    $('.high-scores').attr('style', 'display: none')
  }

  function showPage(page) {
      page.attr('style', 'display: block')
  }

  var questionEl = document.querySelector('#question-text')
  var answerBtns = document.querySelectorAll('.answer-btn')
  
  var triviaUrl
  var factUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';
  
  var questionBank = []
  var playerPoints = 0
  var pointsForAnswer = 100
  var wrongAnswer = 0
// added to cuz matarialize is dumb --spencer
// wont recognize new options in select fields unless told to --spencer
  $('#category').formSelect();
  $('#category').on('contentChanged', function() {
    $(this).formSelect();
  });
  
  function fetchQuestions() {
  //    https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple --example url 
     triviaUrl = 'https://opentdb.com/api.php?amount=';
     questionBank = [];
     playerPoints = 0;
      var number = $('#questions-number').val()
      var cat = $('#category').val()
      var diff = $('#difficulty').val()
      var type = $('#question-type').val()
      triviaUrl += number
      console.log(cat)
      if (cat != 0) {
          triviaUrl += `&category=${cat}`
      }
      if (diff == 1) {
          triviaUrl += `&difficulty=easy`
      } else if (diff == 2) {
          triviaUrl += `&difficulty=medium`
      } else if (diff == 3) {
          triviaUrl += `&difficulty=hard`
      }
      if (type == 1) {
          triviaUrl += `&type=multiple`
      } else if (type == 2) {
          triviaUrl += `&type=boolean`
      }
      console.log(triviaUrl)
      fetch(triviaUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // console.log(data.results[0])
      for (let i = 0; i < data.results.length; i++) {
          questionBank.push(data.results[i])
      }
      console.log(questionBank)
      console.log(questionBank[0].correct_answer)
      
      quizStart()
    });
  
    fetch(factUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.text);
    });
  }
  
  
  quizIndex = 0;
  
  var decodeHTML = function (html) {
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
  };
  
  function htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }
  
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  function showQuestion() {
      
    questionEl.textContent = questionBank[quizIndex].question;
      if (questionBank[quizIndex].type == "boolean") {
          answerBtns[0].textContent = "True" 
          answerBtns[1].textContent = "False" 
          answerBtns[2].setAttribute('style', 'display: none')
          answerBtns[3].setAttribute('style', 'display: none')
      } else {
          answerBtns.forEach(element => {
              element.setAttribute('style', 'display: block')
          })
       // load question into the h1
      questionBank[quizIndex].incorrect_answers.push(questionBank[quizIndex].correct_answer)
      shuffleArray(questionBank[quizIndex].incorrect_answers)
      for (let i = 0; i < questionBank[quizIndex].incorrect_answers.length; i++) {
          questionBank[quizIndex].incorrect_answers[i] = decodeHTML(questionBank[quizIndex].incorrect_answers[i])
          questionBank[quizIndex].incorrect_answers[i] = htmlDecode(questionBank[quizIndex].incorrect_answers[i])
      }
      for (let i = 0; i < answerBtns.length; i++) {
      answerBtns[i].textContent = questionBank[quizIndex].incorrect_answers[i];    
      } // put answer options into every button
      
    }}
  
  function newQuestion() { // if there are questions left, go to the next question
      if (quizIndex < (questionBank.length-1)) {
          quizIndex++; 
          showQuestion();
      } else { // if there are no questions left end the quiz
          $('.your-score-is').text(`You answered ${questionBank.length - wrongAnswer} out of ${questionBank.length} questions correctly for ${playerPoints}!`)
          $('.score-percentage').text(`You were right ${((quizIndex + 1 - wrongAnswer)/ (quizIndex + 1))*100}% of the time! `) 
          hideAll()
          showPage($('.end-of-game'))
          $('#questions-number').val('')
      }
  }
  
  function readAnswer(answer) {
      questionBank[quizIndex].correct_answer = decodeHTML(questionBank[quizIndex].correct_answer);
      questionBank[quizIndex].correct_answer = htmlDecode(questionBank[quizIndex].correct_answer);
      if (questionBank[quizIndex].correct_answer === answer) {
          playerPoints += pointsForAnswer
          newQuestion();
      } else {
          wrongAnswer ++
          newQuestion();
      }
    };
  
  function quizStart() {
    //   TODO: pub vision
    //   if ($('#pub')) {
    //       for (let i = 0; i < answerBtns.length; i++) {
    //           answerBtns[i].classList.add(`y${i+1}`)
    //           answerBtns[i].classList.add('blob')
    //           document.querySelectorAll('.animate-btn')[i].classList.add('blob-wrap', `blob-${i+1}`, `x${i+1}`)
              
    //       }
          
    //   }
        hideAll()
        showPage($('.game-play'))
      quizIndex = 0
      for (let i = 0; i < questionBank.length; i++) {
          questionBank[i].question = decodeHTML(questionBank[i].question)
          questionBank[i].question = htmlDecode(questionBank[i].question)
      }
      showQuestion()
      
  }
  
      document.querySelectorAll(".answer-btn").forEach(element => { // when any one of the answers are clicked send the text content of that answer button to be checked in the read answer function 
          element.addEventListener("click", event =>{
          const clicked = event.target;
          if (clicked.matches("button")) {
              readAnswer(clicked.textContent)
          }
      })
          
      });
  
  
  var categoryUrl = 'https://opentdb.com/api_category.php'  
  var categories  = []

  function init () {
      hideAll()
      showPage($('.page-load'))
      fetch(categoryUrl).then(function (response) {
          return response.json();
      })
      .then(function(data) {
      console.log(data)
      for (let i = 0; i < data.trivia_categories.length; i++) {
          categories.push(data.trivia_categories[i])
          }
          console.log(categories)
          console.log(categories[0].name)
          for (let j = 0; j < categories.length; j++) {
              $('#category').append(new Option(categories[j].name, categories[j].id)
              
              )}
        $("#category").trigger('contentChanged');
    })
    let storedScores = JSON.parse(localStorage.getItem("scores")); // pull any stored scores from local storage

    if (storedScores !== null) {
        scores = storedScores;
    }
    renderScores();
  }
 
const scoreList = document.querySelector('.stored-scores')
let scores = [];

function sortScores(a, b) { // sort scores descending by time
   return b.points - a.points;
}

function renderScores() { // create score list
    scoreList.innerHTML = ""; // clear scores

    scores.sort(sortScores);

    for (let i = 0; i < scores.length; i++) { // add list element for every score with rank name points and percent
        let score = scores[i];
        let scoreLi = document.createElement("li");
        scoreLi.textContent = `${i+1}. ${score.name} ${score.points} ${score.percentCorrect}%`;
        scoreList.appendChild(scoreLi) 
    }
}

// function init() {
//     let storedScores = JSON.parse(localStorage.getItem("scores")); // pull any stored scores from local storage

//     if (storedScores !== null) {
//         scores = storedScores;
//     }
//     renderScores();
// }

function storeScores() { // store scores in local storage
    localStorage.setItem("scores", JSON.stringify(scores));
}

const nameInput = document.querySelector('#score-name')
const clearScores = document.querySelector('.clear-scores-btn')
// submitScoreBtn.addEventListener("click", function (event) { // when scores are submitted
//     event.preventDefault();
//     let playerScore = {
//         name: nameInput.value.trim(),
//         points: playerPoints,
//         percentCorrect: ((quizIndex + 1 - wrongAnswer)/ (quizIndex + 1))*100
//     }
//     if(playerScore.name === "") { // if nothing in name stop function
//         return;
//     }
//     scores.push(playerScore); // add the submitted score to the scores list
//     nameInput.value = "";
//     storeScores();
//     renderScores();
//     toHighscorePage(); // send to highscore page
// })

clearScores.addEventListener("click", function () { // clear scores function empties all recorded scores in local storage
    scores = []
    localStorage.removeItem("scores")
    renderScores();
})


  $("#quiz-start").click(fetchQuestions)
  $('#to-selections').click(function() {
      hideAll();
      showPage($('.trivia-selections'))
    })

  $('#play-again').click(function() {
      hideAll();
      showPage($('.trivia-selections'))
  })
  
  $("#submit-score").click(function(event) {
    event.preventDefault();
    let playerScore = {
        name: nameInput.value.trim(),
        points: playerPoints,
        percentCorrect: ((quizIndex + 1 - wrongAnswer)/ (quizIndex + 1))*100
    }
    if(playerScore.name === "") { // if nothing in name input stop function
        return;
    }
    scores.push(playerScore); // add the submitted score to the scores list
    nameInput.value = "";
    storeScores();
    renderScores();  
    hideAll();
    showPage($('.high-scores'))
  })
$('#high-scores').click(event => {
    event.preventDefault()
    hideAll()
    showPage($('.high-scores'))
})

 init()

  // TODO: pub vision
//   let last = 0;
//   let changeSpeed = 1500;
//   let rAF;
//   var blobs = document.querySelectorAll('.blob')
  
//   function render(now) {
//       blobs = document.querySelectorAll('.blob')
//       if (!last || now - last >= changeSpeed) {
//         last = now;
//         blobs.forEach(blob => {
//           blob.style.borderTopLeftRadius = `${random()}px ${random()}px`;
//           blob.style.borderTopRightRadius = `${random()}px ${random()}px`;
//           blob.style.borderBottomLeftRadius = `${random()}px ${random()}px`;
//           blob.style.borderBottomRightRadius = `${random()}px ${random()}px`;
//         });
//       }
//       rAF = requestAnimationFrame(render);
//     }
  
//   const random = () => {
//       return Math.floor((Math.random() * 1000000));
//     };
  
//   render(last);