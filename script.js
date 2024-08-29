function rollDice() {
    // Add the roll animation to both players' dice
    const player1Dice1Element = document.getElementById('player1-dice1');
    const player1Dice2Element = document.getElementById('player1-dice2');
    const player2Dice1Element = document.getElementById('player2-dice1');
    const player2Dice2Element = document.getElementById('player2-dice2');

    player1Dice1Element.classList.add('roll');
    player1Dice2Element.classList.add('roll');
    player2Dice1Element.classList.add('roll');
    player2Dice2Element.classList.add('roll');

    // Roll dice for Player 1
    const player1Dice1 = Math.floor(Math.random() * 6) + 1;
    const player1Dice2 = Math.floor(Math.random() * 6) + 1;
    const player1Total = player1Dice1 + player1Dice2;

    setTimeout(() => {
        player1Dice1Element.src = `dice${player1Dice1}.png`;
        player1Dice2Element.src = `dice${player1Dice2}.png`;
        document.getElementById('player1-score').textContent = `Score: ${player1Total}`;
        player1Dice1Element.classList.remove('roll');
        player1Dice2Element.classList.remove('roll');
    }, 500);

    // Roll dice for Player 2
    const player2Dice1 = Math.floor(Math.random() * 6) + 1;
    const player2Dice2 = Math.floor(Math.random() * 6) + 1;
    const player2Total = player2Dice1 + player2Dice2;

    setTimeout(() => {
        player2Dice1Element.src = `dice${player2Dice1}.png`;
        player2Dice2Element.src = `dice${player2Dice2}.png`;
        document.getElementById('player2-score').textContent = `Score: ${player2Total}`;
        player2Dice1Element.classList.remove('roll');
        player2Dice2Element.classList.remove('roll');
    }, 500);

    // Determine the winner after a delay to wait for the animations
    setTimeout(() => {
        let resultText;
        let winnerElement;

        // Reset any previous winner animation
        document.getElementById('player1-score').classList.remove('winner');
        document.getElementById('player2-score').classList.remove('winner');

        if (player1Total > player2Total) {
            resultText = `Player 1 Wins with ${player1Total}!`;
            winnerElement = document.getElementById('player1-score');
        } else if (player2Total > player1Total) {
            resultText = `Player 2 Wins with ${player2Total}!`;
            winnerElement = document.getElementById('player2-score');
        } else {
            resultText = `It's a Draw! Both scored ${player1Total}`;
        }

        document.getElementById('result').textContent = resultText;

        if (winnerElement) {
            winnerElement.classList.add('winner');
        }
    }, 600);
}

// for maths game
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
    const num1 = getRandomNumber(1, 10);  // Generate numbers between 1 and 10
    const num2 = getRandomNumber(1, 10);
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let problem;
    let answer;

    if (operation === '+') {
        problem = `${num1} + ${num2}`;
    } else if (operation === '-') {
        problem = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;  // Ensure no negative results
    } else if (operation === '*') {
        problem = `${num1} * ${num2}`;
    } else if (operation === '/') {
        const dividend = num1 * num2;  // Ensure the division is always clean
        problem = `${dividend} / ${num2}`;
    }

    document.getElementById('problem').textContent = problem;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
    const problem = document.getElementById('problem').textContent;
    const correctAnswer = eval(problem);
    const studentAnswer = parseFloat(document.getElementById('answer').value);

    if (studentAnswer === correctAnswer) {
        document.getElementById('feedback').textContent = 'Great job! 🎉';
        document.getElementById('feedback').style.color = '#4CAF50'; /* Green */
    } else {
        document.getElementById('feedback').textContent = `Oops! The correct answer was ${correctAnswer}.`;
        document.getElementById('feedback').style.color = '#FF6347'; /* Red */
    }
}

// Generate the first problem when the page loads
generateProblem();
