// Inicializando as variáveis do jogo
let playerHealth = 100;
let enemyHealth = 100;
let playerTurn = true;

const playerHealthDisplay = document.getElementById("player-health");
const enemyHealthDisplay = document.getElementById("enemy-health");
const messageDisplay = document.getElementById("message");

function updateStatus() {
    playerHealthDisplay.textContent = `Vida: ${playerHealth}`;
    enemyHealthDisplay.textContent = `Vida: ${enemyHealth}`;
}

function gameOver(winner) {
    if (winner === "player") {
        messageDisplay.textContent = "Você venceu! Parabéns!";
    } else {
        messageDisplay.textContent = "Você perdeu! Tente novamente.";
    }
    document.querySelectorAll("button").forEach(button => button.disabled = true);
}

// Função de ataque do jogador
function playerAttack() {
    if (playerTurn) {
        const damage = Math.floor(Math.random() * 20) + 5; // dano entre 5 e 25
        enemyHealth -= damage;
        messageDisplay.textContent = `Você atacou e causou ${damage} de dano!`;

        if (enemyHealth <= 0) {
            enemyHealth = 0;
            gameOver("player");
        } else {
            playerTurn = false;
            enemyTurn();
        }

        updateStatus();
    }
}

// Função de defesa do jogador
function playerDefend() {
    if (playerTurn) {
        const shield = Math.floor(Math.random() * 10) + 1; // defesa entre 1 e 10
        messageDisplay.textContent = `Você se defendeu e bloqueou ${shield} de dano.`;
        playerTurn = false;
        enemyTurn();
    }
}

// Função de cura do jogador
function playerHeal() {
    if (playerTurn) {
        const heal = Math.floor(Math.random() * 15) + 5; // cura entre 5 e 20
        playerHealth += heal;
        messageDisplay.textContent = `Você se curou em ${heal} pontos!`;

        if (playerHealth > 100) playerHealth = 100; // vida não pode ultrapassar 100

        playerTurn = false;
        enemyTurn();
        updateStatus();
    }
}

// Função de turno do inimigo
function enemyTurn() {
    setTimeout(() => {
        const action = Math.random();
        let enemyDamage = 0;

        if (action < 0.33) {
            enemyDamage = Math.floor(Math.random() * 20) + 5; // ataque
            playerHealth -= enemyDamage;
            messageDisplay.textContent = `O inimigo atacou e causou ${enemyDamage} de dano!`;
        } else if (action < 0.66) {
            const heal = Math.floor(Math.random() * 15) + 5; // cura
            enemyHealth += heal;
            if (enemyHealth > 100) enemyHealth = 100;
            messageDisplay.textContent = `O inimigo se curou em ${heal} pontos!`;
        } else {
            messageDisplay.textContent = "O inimigo se preparou para o próximo ataque!";
        }

        if (playerHealth <= 0) {
            playerHealth = 0;
            gameOver("enemy");
        }

        playerTurn = true;
        updateStatus();
    }, 1000); // Inimigo demora 1 segundo para agir
}
