let randomNumber=parseInt(Math.random()*100 +1)
const submit=document.querySelector('#subt')
const userInput=document.querySelector('#guessField')
const guessSlot=document.querySelector('.guesses')
const remaining=document.querySelector('.lastResult')
const lowOrHi= document.querySelector('.lowOrHi')
const startOver=document.querySelector('.resultParas')

const p= document.createElement('p')


let prevGuess= []
let numGuesses= 1

let playGame= true

if(playGame){
  submit.addEventListener('click',function(e){
    e.preventDefault() //Default action prevent krk event lgaenge kyunki form me value server me chli jaegi
    const guess=parseInt(userInput.value) //User se input lie hai
    validateGuess(guess) //validate krne aage bhej die
  })
}

function validateGuess(guess){
  //User Valid values dia to hai na 1 to 100 k bich me value hai ya nhi
  if(isNaN(guess)){
    alert(("Please enter a valid number"))
  }
  else if(guess<1){
    alert(("Please enter a number <1"))
  }
  else if(guess>100){
    alert(("Please enter a number >100"))
  }
  else{
    prevGuess.push(guess)
    if(numGuesses ==11){
      displayGuess(guess)
      displayMessage(`Game over. Random number was ${randomNumber}`)
      endGame()
    }
    else{
      displayGuess(guess)
      checkGuess(guess)
    }
  }
}

function checkGuess(guess){
  //Ye btaega ki aapne jo value insert kiya hai wo less hai high hai ya equal hai
  if(guess==randomNumber){
    displayMessage("You guessed it right")
    endGame()
  }
  else if(guess<randomNumber){
    displayMessage("Number is TOO low. Try higher numbers")
  }
  else{
    displayMessage("Number is TOO high.Try lower numbers")
  }
}

function displayGuess(guess){
  //values ko clean krega, Guesses ko update krega
  userInput.value= ""
  guessSlot.innerHTML += `${guess} `
  numGuesses++;
  remaining.innerHTML= `${11-numGuesses}`
}

function displayMessage(message){
  //Ye message sidha DOM k saath interact krega 
  //Message print hoga
  lowOrHi.innerHTML= `<h2>${message}</h2>`
}

function endGame(){
  //Game khtm ho gya
  userInput.value= ''
  userInput.setAttribute('disabled','') //disabled key value pair me set hota hai
  p.classList.add('button')
  p.innerHTML= `<h2 id="newGame">Start new game</h2>`
  startOver.append(p) //Start over me paragraph add kr die
  playGame=false
  newGame();
}

function newGame(){
  //Nya game khelna hai
  const newGameButton=document.querySelector('#newGame')
  newGameButton.addEventListener('click',function(e){
    randomNumber =parseInt(Math.random()*100 +1)
    prevGuess= []
    numGuesses=1
    guessSlot.innerHTML= ''
    remaining.innerHTML= `${11-numGuesses}`
    userInput.removeAttribute('disabled')
    startOver.removeChild(p)
    playGame=true
  })
}