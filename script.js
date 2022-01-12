

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
        $('.modal').modal();
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
  
  var triviaUrl = 'https://opentdb.com/api.php?amount=';
  var factUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';
  
  var questionBank = []
// added to cuz matarialize is dumb --spencer
// wont recognize new options in select fields unless told to --spencer
  $('#category').formSelect();
  $('#category').on('contentChanged', function() {
    $(this).formSelect();
  });
  
  function fetchQuestions() {
  //    https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple --example url 
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
      for (let k = 0; k < answerBtns.length; k++) {
          answerBtns[k].setAttribute('style', 'display: block')
          
      }
      questionEl.textContent = questionBank[quizIndex].question; // load question into the h1
      questionBank[quizIndex].incorrect_answers.push(questionBank[quizIndex].correct_answer)
      shuffleArray(questionBank[quizIndex].incorrect_answers)
      for (let i = 0; i < questionBank[quizIndex].incorrect_answers.length; i++) {
          questionBank[quizIndex].incorrect_answers[i] = decodeHTML(questionBank[quizIndex].incorrect_answers[i])
      }
      for (let i = 0; i < answerBtns.length; i++) {
      answerBtns[i].textContent = questionBank[quizIndex].incorrect_answers[i];    
      } // put answer options into every button
      for (let j = 0; j < answerBtns.length; j++) {
         if (answerBtns[j].textContent == "") {
            answerBtns[j].setAttribute('style', 'display: none')             
         }
          
      }
    }
  
  function newQuestion() { // if there are questions left, go to the next question
      if (quizIndex < (questionBank.length-1)) {
          quizIndex++; 
          showQuestion();
      } else { // if there are no questions left end the quiz
          hideAll()
          showPage($('.end-of-game'))
      }
  }
  
  function readAnswer(answer) {
      if (questionBank[quizIndex].correct_answer === answer) {
          newQuestion();
      }};
  
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
  }
  
  $("#quiz-start").click(fetchQuestions)
  $('#to-selections').click(function() {
      hideAll();
      showPage($('.trivia-selections'))
    })

  $('#play-again').click(function() {
      hideAll();
      showPage($('.trivia-selections'))
  })
  
  $("#submit-score").click(function() {
      hideAll();
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