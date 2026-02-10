const gameState = {
  currentPosition: 0,
  score: 0,
  canRoll: true,
  totalTiles: 20,
  missedTurn: false
};

const tileTypes = [
  { id: 0, name: 'START\nCalm Seas', type: 'start', color: '#27AE60', icon: '⚓' },
  { id: 1, name: 'Typhoon\nFormation', type: 'quiz', color: '#3498DB', icon: '⚡' },
  { id: 2, name: 'Wind\nSystems', type: 'drag-drop', color: '#9B59B6', icon: '💨' },
  { id: 3, name: 'Storm\nDevelopment', type: 'regular', color: '#16A085', icon: '🌀' },
  { id: 4, name: 'Rainfall &\nFlooding', type: 'problem-solving', color: '#E67E22', icon: '🌧️' },
  { id: 5, name: 'Weather\nPatterns', type: 'regular', color: '#2C3E50', icon: '☁️' },
  { id: 6, name: 'Storm\nSurge', type: 'simulation', color: '#C0392B', icon: '🌊' },
  { id: 7, name: 'Coastal\nImpact', type: 'regular', color: '#D35400', icon: '🏖️' },
  { id: 8, name: 'Preparedness\nQuiz', type: 'scenario', color: '#8E44AD', icon: '🛡️' },
  { id: 9, name: 'Emergency\nKit', type: 'regular', color: '#27AE60', icon: '🎒' },
  { id: 10, name: 'Bonus\nChallenge', type: 'bonus', color: '#F39C12', icon: '⭐' },
  { id: 11, name: 'Evacuation\nPlan', type: 'regular', color: '#16A085', icon: '🚨' },
  { id: 12, name: 'Environmental\nImpacts', type: 'reflection', color: '#7F8C8D', icon: '🌍' },
  { id: 13, name: 'Community\nResponse', type: 'regular', color: '#2980B9', icon: '👥' },
  { id: 14, name: 'Satellite\nData', type: 'quiz', color: '#8E44AD', icon: '🛰️' },
  { id: 15, name: 'Warning\nSystems', type: 'regular', color: '#E74C3C', icon: '📢' },
  { id: 16, name: 'Recovery\nEfforts', type: 'regular', color: '#27AE60', icon: '🔧' },
  { id: 17, name: 'Climate\nChange', type: 'quiz', color: '#3498DB', icon: '🌡️' },
  { id: 18, name: 'Final\nChallenge', type: 'problem-solving', color: '#C0392B', icon: '🎯' },
  { id: 19, name: 'SAFE ZONE', type: 'end', color: '#27AE60', icon: '🏁' }
];

const challenges = {
  quiz: [
    {
      question: 'Which conditions are necessary for typhoon formation?',
      options: [
        'Warm ocean water (above 26.5°C), low wind shear, and moisture',
        'Cold water, high altitude, and dry air',
        'Desert conditions and high pressure systems',
        'Polar conditions and ice formation'
      ],
      correct: 0,
      hint: 'Think about tropical conditions and what fuels these massive storms.'
    },
    {
      question: 'What is the eye of a typhoon?',
      options: [
        'The most dangerous part with strongest winds',
        'A calm center with clear skies and light winds',
        'Where the storm originates',
        'The outer edge of the storm'
      ],
      correct: 1,
      hint: 'This is the calm center of the storm, surrounded by the eyewall.'
    },
    {
      question: 'How does climate change affect typhoons?',
      options: [
        'Makes them weaker and less frequent',
        'Has no effect on typhoon patterns',
        'Increases intensity and rainfall potential',
        'Only affects their direction'
      ],
      correct: 2,
      hint: 'Warmer oceans provide more energy for storms.'
    }
  ],
  dragDrop: [
    {
      question: 'Arrange global wind patterns correctly on a digital map',
      instruction: 'Drag the wind systems to arrange them from low to high pressure:',
      items: ['Trade Winds', 'Westerlies', 'Polar Easterlies'],
      correctOrder: ['Trade Winds', 'Westerlies', 'Polar Easterlies']
    }
  ],
  problemSolving: [
    {
      question: 'A typhoon is approaching with expected rainfall of 400mm in 24 hours. The drainage system can handle 15mm per hour. Will flooding occur?',
      options: [
        'No, the drainage is sufficient',
        'Yes, flooding will occur - drainage can only handle 360mm',
        'Maybe, it depends on other factors',
        'No flooding if it rains evenly'
      ],
      correct: 1,
      explanation: 'Drainage capacity: 15mm/hour × 24 hours = 360mm. Since 400mm > 360mm, flooding will occur.'
    },
    {
      question: 'Wind speed is 180 km/h and coastal elevation is 3m. Storm surge prediction is 5m. Will the coastal area flood?',
      options: [
        'No, the elevation is high enough',
        'Yes, storm surge exceeds coastal elevation by 2m',
        'Only during high tide',
        'Insufficient information'
      ],
      correct: 1,
      explanation: 'Storm surge (5m) > coastal elevation (3m), so flooding will occur with 2m of water above ground level.'
    }
  ],
  simulation: [
    {
      question: 'Predict affected areas based on wind speed and coastal elevation',
      scenario: 'A typhoon with 150 km/h winds is approaching. Storm surge is predicted at 4 meters. Coastal areas have elevations of 2m, 3m, and 5m.',
      question_text: 'Which areas will be affected by the storm surge?',
      options: [
        'Only the 2m elevation area',
        'Both 2m and 3m elevation areas',
        'All areas including 5m elevation',
        'No areas will be affected'
      ],
      correct: 1,
      explanation: 'Storm surge of 4m will flood areas at 2m and 3m elevation, but not the 5m area.'
    }
  ],
  scenario: [
    {
      question: 'Your community receives a typhoon warning 48 hours before expected landfall. Choose the best emergency response plan:',
      options: [
        'Wait and see if it actually comes',
        'Evacuate immediately, prepare emergency kit, secure property, follow official warnings',
        'Only buy food supplies',
        'Stay home and hope for the best'
      ],
      correct: 1,
      hint: 'The best response involves multiple preparation steps and following official guidance.'
    }
  ],
  reflection: [
    {
      question: 'Match human and environmental consequences with typhoon severity',
      instruction: 'Consider how typhoons impact both people and the environment',
      prompt: 'What are the main environmental impacts of severe typhoons?',
      options: [
        'Coastal erosion, habitat destruction, water contamination, deforestation',
        'Only property damage',
        'No long-term environmental effects',
        'Only affects ocean temperature'
      ],
      correct: 0
    }
  ],
  bonus: [
    {
      question: 'Spot the Misconception: Identify the FALSE statement about typhoons',
      options: [
        'Typhoons rotate counterclockwise in the Northern Hemisphere',
        'Opening windows during a typhoon equalizes pressure and prevents damage',
        'The eyewall has the strongest winds',
        'Typhoons weaken rapidly over land due to lack of moisture'
      ],
      correct: 1,
      explanation: 'Opening windows is a dangerous myth! It doesn\'t help and exposes you to flying debris.'
    }
  ]
};

function initializeGame() {
  drawGameBoard();
  updateDisplay();
  setupEventListeners();
}

function drawGameBoard() {
  const gamePath = document.getElementById('gamePath');
  const svgNS = 'http://www.w3.org/2000/svg';

  const pathPoints = [
    { x: 100, y: 700 },
    { x: 200, y: 650 },
    { x: 300, y: 600 },
    { x: 400, y: 550 },
    { x: 500, y: 500 },
    { x: 600, y: 480 },
    { x: 700, y: 460 },
    { x: 800, y: 450 },
    { x: 900, y: 440 },
    { x: 1000, y: 420 },
    { x: 1050, y: 380 },
    { x: 1000, y: 340 },
    { x: 900, y: 300 },
    { x: 800, y: 270 },
    { x: 700, y: 250 },
    { x: 600, y: 230 },
    { x: 500, y: 200 },
    { x: 400, y: 180 },
    { x: 300, y: 150 },
    { x: 200, y: 120 }
  ];

  pathPoints.forEach((point, index) => {
    if (index >= tileTypes.length) return;

    const tile = tileTypes[index];
    const tileGroup = document.createElementNS(svgNS, 'g');
    tileGroup.classList.add('tile');
    tileGroup.setAttribute('data-tile-id', tile.id);

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);
    circle.setAttribute('r', 35);
    circle.setAttribute('fill', tile.color);
    circle.setAttribute('stroke', '#fff');
    circle.setAttribute('stroke-width', '3');
    circle.classList.add('tile-body');

    const icon = document.createElementNS(svgNS, 'text');
    icon.setAttribute('x', point.x);
    icon.setAttribute('y', point.y - 5);
    icon.setAttribute('text-anchor', 'middle');
    icon.setAttribute('fill', '#fff');
    icon.setAttribute('font-size', '24');
    icon.textContent = tile.icon;
    icon.classList.add('tile-icon');

    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', point.x);
    text.setAttribute('y', point.y + 55);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#fff');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-weight', 'bold');
    text.classList.add('tile-text');

    const lines = tile.name.split('\n');
    lines.forEach((line, i) => {
      const tspan = document.createElementNS(svgNS, 'tspan');
      tspan.setAttribute('x', point.x);
      tspan.setAttribute('dy', i === 0 ? '0' : '14');
      tspan.textContent = line;
      text.appendChild(tspan);
    });

    tileGroup.appendChild(circle);
    tileGroup.appendChild(icon);
    tileGroup.appendChild(text);
    gamePath.appendChild(tileGroup);

    if (index < pathPoints.length - 1) {
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', point.x);
      line.setAttribute('y1', point.y);
      line.setAttribute('x2', pathPoints[index + 1].x);
      line.setAttribute('y2', pathPoints[index + 1].y);
      line.setAttribute('stroke', '#fff');
      line.setAttribute('stroke-width', '4');
      line.setAttribute('opacity', '0.5');
      line.setAttribute('stroke-dasharray', '5,5');
      gamePath.insertBefore(line, gamePath.firstChild);
    }
  });

  updatePlayerPosition();
}

function updatePlayerPosition() {
  const tiles = document.querySelectorAll('.tile');
  if (tiles[gameState.currentPosition]) {
    const circle = tiles[gameState.currentPosition].querySelector('circle');
    const x = parseFloat(circle.getAttribute('cx'));
    const y = parseFloat(circle.getAttribute('cy'));

    const playerToken = document.getElementById('playerToken');
    playerToken.setAttribute('transform', `translate(${x}, ${y})`);
  }
}

function updateDisplay() {
  document.getElementById('score').textContent = gameState.score;
  document.getElementById('position').textContent = `${gameState.currentPosition}/${tileTypes.length - 1}`;
}

function setupEventListeners() {
  document.getElementById('rollDice').addEventListener('click', rollDice);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('playAgain').addEventListener('click', resetGame);
}

function rollDice() {
  if (!gameState.canRoll) return;

  if (gameState.missedTurn) {
    showFeedback('You missed this turn due to an incorrect answer!', 'error');
    gameState.missedTurn = false;
    return;
  }

  const diceValue = Math.floor(Math.random() * 6) + 1;
  document.getElementById('diceResult').textContent = diceValue;
  document.getElementById('diceResult').classList.add('pulse');

  setTimeout(() => {
    document.getElementById('diceResult').classList.remove('pulse');
  }, 1000);

  gameState.canRoll = false;
  document.getElementById('rollDice').disabled = true;

  setTimeout(() => {
    movePlayer(diceValue);
  }, 1000);
}

function movePlayer(spaces) {
  const targetPosition = Math.min(gameState.currentPosition + spaces, tileTypes.length - 1);

  let currentStep = gameState.currentPosition;
  const interval = setInterval(() => {
    if (currentStep < targetPosition) {
      currentStep++;
      gameState.currentPosition = currentStep;
      updatePlayerPosition();
      updateDisplay();
    } else {
      clearInterval(interval);
      handleTileLanding();
    }
  }, 300);
}

function handleTileLanding() {
  const currentTile = tileTypes[gameState.currentPosition];

  if (currentTile.type === 'end') {
    showWinModal();
    return;
  }

  if (currentTile.type === 'start' || currentTile.type === 'regular') {
    gameState.canRoll = true;
    document.getElementById('rollDice').disabled = false;
    return;
  }

  showChallenge(currentTile);
}

function showChallenge(tile) {
  const modal = document.getElementById('challengeModal');
  const title = document.getElementById('challengeTitle');
  const body = document.getElementById('challengeBody');
  const footer = document.getElementById('challengeFooter');

  title.textContent = tile.name.replace('\n', ' ') + ' Challenge';
  body.innerHTML = '';
  footer.innerHTML = '';

  let challengeData;
  switch (tile.type) {
    case 'quiz':
      challengeData = challenges.quiz[Math.floor(Math.random() * challenges.quiz.length)];
      renderQuiz(challengeData, body);
      break;
    case 'drag-drop':
      challengeData = challenges.dragDrop[0];
      renderDragDrop(challengeData, body, footer);
      break;
    case 'problem-solving':
      challengeData = challenges.problemSolving[Math.floor(Math.random() * challenges.problemSolving.length)];
      renderQuiz(challengeData, body);
      break;
    case 'simulation':
      challengeData = challenges.simulation[0];
      renderSimulation(challengeData, body);
      break;
    case 'scenario':
      challengeData = challenges.scenario[0];
      renderQuiz(challengeData, body);
      break;
    case 'reflection':
      challengeData = challenges.reflection[0];
      renderQuiz(challengeData, body);
      break;
    case 'bonus':
      challengeData = challenges.bonus[0];
      renderQuiz(challengeData, body);
      break;
  }

  modal.classList.add('show');
}

function renderQuiz(challenge, container) {
  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.textContent = challenge.question;
  container.appendChild(questionDiv);

  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'options';

  challenge.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => handleQuizAnswer(index, challenge, button, optionsDiv));
    optionsDiv.appendChild(button);
  });

  container.appendChild(optionsDiv);
}

function handleQuizAnswer(selectedIndex, challenge, button, container) {
  const allButtons = container.querySelectorAll('.option-btn');
  allButtons.forEach(btn => btn.disabled = true);

  const feedbackDiv = document.createElement('div');
  feedbackDiv.className = 'feedback';

  if (selectedIndex === challenge.correct) {
    button.classList.add('correct');
    feedbackDiv.classList.add('success');
    feedbackDiv.textContent = 'Correct! Well done!';

    const points = 10;
    gameState.score += points;

    if (challenge.explanation) {
      feedbackDiv.textContent += ' ' + challenge.explanation;
    }

    updateDisplay();

    setTimeout(() => {
      closeModal();
      gameState.canRoll = true;
      document.getElementById('rollDice').disabled = false;
    }, 2500);
  } else {
    button.classList.add('incorrect');
    allButtons[challenge.correct].classList.add('correct');
    feedbackDiv.classList.add('error');
    feedbackDiv.textContent = 'Incorrect. You will move back 2 spaces or lose a turn.';

    if (challenge.hint) {
      const hintDiv = document.createElement('div');
      hintDiv.className = 'hint';
      hintDiv.textContent = 'Hint: ' + challenge.hint;
      container.parentElement.appendChild(hintDiv);
    }

    setTimeout(() => {
      closeModal();

      if (gameState.currentPosition >= 2) {
        gameState.currentPosition -= 2;
        updatePlayerPosition();
        updateDisplay();
      } else {
        gameState.missedTurn = true;
      }

      gameState.canRoll = true;
      document.getElementById('rollDice').disabled = false;
    }, 3000);
  }

  container.parentElement.appendChild(feedbackDiv);
}

function renderDragDrop(challenge, container, footer) {
  const instructionDiv = document.createElement('div');
  instructionDiv.className = 'question';
  instructionDiv.textContent = challenge.instruction;
  container.appendChild(instructionDiv);

  const dropZone = document.createElement('div');
  dropZone.className = 'drop-zone';
  dropZone.textContent = 'Drop items here in correct order';
  container.appendChild(dropZone);

  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'drag-drop-container';

  const shuffled = [...challenge.items].sort(() => Math.random() - 0.5);
  shuffled.forEach(item => {
    const draggable = document.createElement('div');
    draggable.className = 'draggable-item';
    draggable.textContent = item;
    draggable.draggable = true;

    draggable.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item);
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });

    itemsContainer.appendChild(draggable);
  });

  container.appendChild(itemsContainer);

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    const draggable = Array.from(itemsContainer.children).find(el => el.textContent === item);
    if (draggable) {
      dropZone.appendChild(draggable);
      if (dropZone.textContent.includes('Drop items')) {
        dropZone.textContent = '';
      }
    }
  });

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn-primary';
  submitBtn.textContent = 'Submit Answer';
  submitBtn.addEventListener('click', () => {
    const droppedItems = Array.from(dropZone.children).map(el => el.textContent);
    const correct = JSON.stringify(droppedItems) === JSON.stringify(challenge.correctOrder);

    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback';

    if (correct) {
      feedbackDiv.classList.add('success');
      feedbackDiv.textContent = 'Correct! Perfect arrangement!';
      gameState.score += 15;
      updateDisplay();

      setTimeout(() => {
        closeModal();
        gameState.canRoll = true;
        document.getElementById('rollDice').disabled = false;
      }, 2000);
    } else {
      feedbackDiv.classList.add('error');
      feedbackDiv.textContent = 'Incorrect order. Try again!';
    }

    container.appendChild(feedbackDiv);
  });

  footer.appendChild(submitBtn);
}

function renderSimulation(challenge, container) {
  const scenarioDiv = document.createElement('div');
  scenarioDiv.className = 'question';
  scenarioDiv.innerHTML = `<strong>Scenario:</strong> ${challenge.scenario}`;
  container.appendChild(scenarioDiv);

  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.textContent = challenge.question_text;
  container.appendChild(questionDiv);

  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'options';

  challenge.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => handleQuizAnswer(index, challenge, button, optionsDiv));
    optionsDiv.appendChild(button);
  });

  container.appendChild(optionsDiv);
}

function closeModal() {
  document.getElementById('challengeModal').classList.remove('show');
}

function showWinModal() {
  const modal = document.getElementById('winModal');
  document.getElementById('finalScore').textContent = gameState.score;
  modal.classList.add('show');
}

function resetGame() {
  gameState.currentPosition = 0;
  gameState.score = 0;
  gameState.canRoll = true;
  gameState.missedTurn = false;

  document.getElementById('winModal').classList.remove('show');
  document.getElementById('diceResult').textContent = '';
  document.getElementById('rollDice').disabled = false;
  document.getElementById('reflectionText').value = '';

  updatePlayerPosition();
  updateDisplay();
}

function showFeedback(message, type) {
  const diceResult = document.getElementById('diceResult');
  diceResult.textContent = '';
  diceResult.style.fontSize = '1rem';
  diceResult.textContent = message;
  diceResult.classList.add('shake');

  setTimeout(() => {
    diceResult.classList.remove('shake');
    diceResult.style.fontSize = '3rem';
    diceResult.textContent = '';
  }, 2000);
}

document.addEventListener('DOMContentLoaded', initializeGame);
