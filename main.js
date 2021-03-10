const cardBoard = document.querySelector("#cardBoard");
const images = [
  'abra.png',
  'articuno.png',
  'bulbasauro.png',
  'chansey.png',
  'charmander.png',
  'chikorita.png',
  'clefairy.png',
  'cubone.png',
  'diglett.png',
  'ditto.png',
  'dratini.png',
  'eevee.png',
  'exeggcute.png',
  'gastly.png',
  'geodude.png',
  'growlithe.png',
  'hitmonchan.png',
  'hitmonlee.png',
  'horsea.png',
  'jigglypuff.png',
  'jynx.png',
  'koffing.png',
  'krabby.png',
  'lapras.png',
  'machop.png',
  'magikarp.png',
  'meowth.png',
  'mewtwo.png',
  'moltres.png',
  'mrmime.png',
  'oddish.png',
  'omanyte.png',
  'onix.png',
  'pikachu.png',
  'poliwag.png',
  'ponyta.png',
  'porygon.png',
  'psyduck.png',
  'rattata.png',
  'seel.png',
  'shellder.png',
  'slowpoke.png',
  'snorlax.png',
  'squirtle.png',
  'staryu.png',
  'tangela.png',
  'vulpix.png',
  'zapdos.png'
];

let cardHTML = '';

images.forEach(img => {
  cardHTML += `
    <div class="memory-card" data-card="${img}">
      <img class="front-card" src="img/${img}">
      <div class="back-card">
      <img class="img-backcard" src="img/logo-card.png">
      </div>
    </div>
  `
});

cardBoard.innerHTML = cardHTML + cardHTML;

/* Fim renderização do HTML */

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
    let rand = Math.floor(Math.random() * 12);
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

