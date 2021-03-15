const cardBoard = document.querySelector("#cardBoard");
var tamanho;
const pokemon = [
  'abra.png','articuno.png','bulbasauro.png','chansey.png','charmander.png','chikorita.png','clefairy.png','cubone.png','diglett.png','ditto.png','dratini.png','eevee.png','exeggcute.png','gastly.png','geodude.png','growlithe.png','hitmonchan.png', 'hitmonlee.png', 'horsea.png', 'jigglypuff.png', 'jynx.png','koffing.png','krabby.png','lapras.png', 'machop.png','magikarp.png','meowth.png','mewtwo.png', 'moltres.png', 'mrmime.png', 'oddish.png','omanyte.png','onix.png','pikachu.png','poliwag.png','ponyta.png','porygon.png','psyduck.png','rattata.png','seel.png','shellder.png','slowpoke.png','snorlax.png','squirtle.png','staryu.png','tangela.png','vulpix.png','zapdos.png'
];

var deck = pokemon;

/* Fim renderização do HTML */

function alteraTema(){
  let dificuldade = document.getElementById("dificuldade").value

  switch(dificuldade){
    case "facil":
      dificuldade = 12;
      tamanho = dificuldade;
      break;
    case "medio":
      dificuldade = 24;
      tamanho = dificuldade;
      break;
    case "dificil":
      dificuldade = 48;
      tamanho = dificuldade;
      break;
  }
  aplicaTema()
}

function aplicaTema(){

  let cardHTML = '';

  for(let i = 0; i < tamanho; i++){
    cardHTML += `
    <div class="memory-card" data-card="${pokemon[i]}">
      <img class="front-card" src="img/pokemon/${pokemon[i]}">
      <div class="back-card">
      <img class="img-backcard" src="img/pokemon/logo-card.png">
      </div>
    </div>
    `
}
cardBoard.innerHTML = cardHTML + cardHTML;

const cards = document.querySelectorAll('.memory-card');

let firstCard, secondCard;
let lockCard = false;

function flipCard(){
  if(lockCard) return false;
  this.classList.add('flip');

  if(!firstCard){
  firstCard = this;

  return false;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch(){
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? disableCards(): resetCards(isMatch);
}

function disableCards(){
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards();
  }, 1000);
  
}

(function shuffle(){
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * tamanho);
    card.style.order = rand;
  });
})();

function resetCards(isMatch = false){
  if(isMatch){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }
  [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach(card => card.addEventListener('click', flipCard));
  
}

aplicaTema()