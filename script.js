// // trivia page handling - cs //not sure about this?
// function pagetriviaInputDisplay(page) {
//     let pagetriviaInputDisplay = document.querySelectorAll('.page-' + page);
//     let other = Math.abs(page - 2) + 1;
//     let pagetriviaInputDisplayHide = document.querySelectorAll('.page-' + other);
//     for (let i = 0; i < pageDisplay.length; i++) {
//         pagetriviaInputDisplay[i].setAttribute('style', 'display:inline;');
//     }
//     for (let i = 0; i < pagetriviaInputDisplayHide.length; i++) {
//         pagetriviaInputDisplayHide[i].setAttribute('style', 'display:none;');
//     }
// }
// triviaInputDisplay(1);

// // random page handling - cs -- not sure about this
// function pageRandomFactDisplay(page) {
//     let pageRandomFactDisplay = document.querySelectorAll('.random-fact-' + page);
//     let other = Math.abs(page - 2) + 1;
//     let pageRandomFactDisplayHide = document.querySelectorAll('.random-fact-' + other);
//     for (let i = 0; i < pageRandomFactDisplay.length; i++) {
//         pageRandomFactDisplay[i].setAttribute('style', 'display:inline;');
//     }
//     for (let i = 0; i < pageRandomFactDisplayHideHide.length; i++) {
//         pageRandomFactDisplayHideHide[i].setAttribute('style', 'display:none;');
//     }
// }
// randomDisplay(1);
function getTrivia (){
    $.ajax({
        url:"https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple",
        method:"GET"
      }).then(function(response){
          console.log (response)
      })
}

getTrivia();

function getRandomFact (){
    $.ajax({
        url:"https://uselessfacts.jsph.pl/random",
        method:"GET"
      }).then(function(response){
          console.log (response)
      })
}
getRandomFact();

// document.addEventListener('DOMContentLoaded', function() {
//      var elems = document.querySelectorAll('select');
//      var instances = M.FormSelect.init(elems, options);
//    });

  // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();
  });
        