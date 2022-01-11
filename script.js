

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