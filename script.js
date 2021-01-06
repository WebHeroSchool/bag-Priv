const body = document.body;
const getById = id => document.getElementById(id);
const startGameBtn = getById('start-button');

const difficultyLabels = [
  getById('label-easy'),
  getById('label-medium'),
  getById('label-hard'),
];

const difficultyMap = {
  'Простой': {
    'class':'three-card-field',
    'cardCount': 3
  },

  'Средний': {
    'class': 'six-card-field',
    'cardCount': 6
  },

  'Сложный': {
    'class': 'ten-card-field',
    'cardCount': 10
  },
};

let difficulty = getById('easy').value;
let cardWasPressed = false;

difficultyLabels.forEach(difficultyBtn => {
  difficultyBtn.onclick = function() {
    difficultyLabels.forEach(difficultyBtn => difficultyBtn.classList.remove('level_active'));
    this.classList.add('level_active');
    difficulty = this.children[0].value;
  };
});

const createCards = (number, field) => {
  let randomCard = Math.floor(Math.random() * number);
  for (let  i = 0; i < number; i++) {
    const cardWrap = document.createElement('div');
    const cardBack = document.createElement('div');
    const winnerCard = document.createElement('div');
    const looserCard = document.createElement('div');
    if (i === randomCard) {
      cardWrap.className = 'card-wrap';
      cardWrap.classList.add('card-wrap_hover');
      field.append(cardWrap);
      cardBack.className = 'card-back';
      cardWrap.append(cardBack);
      winnerCard.className = 'winner-card';
      cardWrap.append(winnerCard);
    } else {
      cardWrap.className = 'card-wrap';
      cardWrap.classList.add('card-wrap_hover');
      field.append(cardWrap);
      cardBack.className = 'card-back';
      cardWrap.append(cardBack);
      looserCard.className = 'looser-card';
      cardWrap.append(looserCard);
    };
  };
};

startGameBtn.addEventListener('click', () => {
  const levelMenu = getById('menu');
  const levelParams = difficultyMap[difficulty];
  const cardsField = document.createElement('div');
  cardsField.className = levelParams['class'];
  body.append(cardsField);

  createCards(levelParams['cardCount'], cardsField);

  levelMenu.style.display = 'none';

  document.querySelectorAll('.card-wrap').forEach(card => {
    card.addEventListener('click', () => {
      if (cardWasPressed) {
        cardsField.style.display = 'none';
        levelMenu.style.display = '';
        cardWasPressed = false;
      } else {
        card.classList.add('card-click');
        card.classList.remove('card-wrap_hover')
        cardWasPressed = true;
      };
    });
  });
});