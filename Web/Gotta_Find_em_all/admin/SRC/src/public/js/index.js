let num_npc = 10;
let player;
let coordinatesDisplay; 
let stepsCounter = 0; 
const arr = [0, 1];
const rand = Math.floor(Math.random() * arr.length);

// Generate random numbers
let X_random, Y_random,Maxstep;

function generateRandomCoordinates() {
    do {
        X_random = Math.floor(Math.random() * (innerWidth -100));
        Y_random = Math.floor(Math.random() * (innerHeight -100));

        X_random = Math.floor(X_random / 10) * 10;
        Y_random = Math.floor(Y_random / 10) * 10;
    } while (checkCollisionWithBuildings({ x: X_random, y: Y_random }));
    Maxstep=(X_random+Y_random)/2;
    localStorage.setItem("Y-Coordinate:", Y_random);
}

function displayRules() {
    const rulesBox = document.createElement('div');
    rulesBox.classList.add('rules-box');
    rulesBox.textContent = "Explore the area using WASD. Interact with NPCs nearby. Find the hidden flag at (X_Random, Y_Random). Use your moves wisely; you MIGHT have limited steps. Keep an eye out; surprises may await.";

    // Style the rules box
    rulesBox.style.position = 'absolute';
    rulesBox.style.left = '50%';
    rulesBox.style.top = '50%';
    rulesBox.style.transform = 'translate(-50%, -50%)';
    rulesBox.style.textAlign = 'center';
    rulesBox.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    rulesBox.style.padding = '20px';
    rulesBox.style.border = '2px solid black';
    rulesBox.style.borderRadius = '10px';
    rulesBox.style.zIndex = '999';
    rulesBox.style.opacity = '10.5';
    rulesBox.style.boxShadow="2px 2px 2px 2px";

    document.body.appendChild(rulesBox);

    setTimeout(() => {
        rulesBox.remove();
    }, 10000);
}

document.addEventListener('DOMContentLoaded', () => {
    displayRules();
    setTimeout(() => {
        generateRandomCoordinates()
        const xRandomComment = document.createComment(`X_random: ${X_random}`);
        document.body.appendChild(xRandomComment);
        
        this.location.pathname === '/' ? initGame() : random();
    }, 10000);
    
});



// Define building areas
const buildingAreas = [ 
    { x: 450, y: 180, width: 440, height: 150 },
    { x: 1260, y: 180, width: 450, height: 150 },
    { x: 1170, y: 490, width: 580, height: 150 },
    { x: 450, y: 550, width: 440, height: 20 },
];

function initGame() {
    createPlayer();
    createCoordinatesDisplay(); //  coordinates 
    let ashNPCSpawned = false;
    for (let i = 0; i < num_npc; i++) {
        if (!ashNPCSpawned) {
            spawnnpc(true); //  ash-npc
            ashNPCSpawned = true;
        } else {
            spawnnpc(false); // non ash-npcs
        }
    }
}

function createPlayer() {
    player = document.createElement('div');
    player.classList.add('player');
    player.style.backgroundImage = "url('./assets/down.png')";
    player.style.width = '80px';
    player.style.height = '100px';
    player.style.position = 'absolute';
    player.style.left = '50px';
    player.style.top = '50px';
    document.body.appendChild(player);

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        movePlayer(key);
    });
}

function movePlayer(key) {
    // Check if stepCounter maxed
    if (stepsCounter >= Maxstep) {
        return;
    }

    const playerRect = player.getBoundingClientRect();
    const playerPosition = {
        x: playerRect.left,
        y: playerRect.top
    };

    const step = 5;

    let newPosition = { x: playerPosition.x, y: playerPosition.y };

    switch (key) {
        case 'w':
            newPosition.y = Math.max(playerPosition.y - step, 0);
            player.style.backgroundImage = "url('./assets/up.png')";
            break;
        case 's':
            newPosition.y = Math.min(playerPosition.y + step, window.innerHeight - playerRect.height);
            player.style.backgroundImage = "url('./assets/down.png')";
            break;
        case 'a':
            newPosition.x = Math.max(playerPosition.x - step, 0);
            player.style.backgroundImage = "url('./assets/left.png')";
            break;
        case 'd':
            newPosition.x = Math.min(playerPosition.x + step, window.innerWidth - playerRect.width);
            player.style.backgroundImage = "url('./assets/right.png')";
            break;
        default:
            break;
    }

    // only if movement is allowed
    if (!checkCollision(newPosition, playerRect)) {
        stepsCounter+=5;
        player.style.left = newPosition.x + 'px';
        player.style.top = newPosition.y + 'px';
        player.classList.add('active');

        updateCoordinates();
        checkInteractions();
    }
}


function checkInteractions() {
    const npcs = document.querySelectorAll('.npc');
    npcs.forEach(npc => {
        const npcRect = npc.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (playerRect.right > npcRect.left &&
            playerRect.left < npcRect.right &&
            playerRect.bottom > npcRect.top &&
            playerRect.top < npcRect.bottom) {

            if (npc.classList.contains('ash-npc')) {
                if (rand === 0) {
                    showDialogue("i heard about the DEV and their TOOLS", npc); 
                } else {
                    showDialogue("I Think They Are Storing something LOCALLY", npc); 
                }
            } else {
                showDialogue("Hello, " + getPlayerName(), npc); 
            }
        }
    });
}

function spawnnpc(isAshNPC) {
    let npcPosition;
    do {
        npcPosition = {
            x: Math.random() * (window.innerWidth - 50),
            y: Math.random() * (window.innerHeight - 50)
        };
    } while (checkCollisionWithBuildings(npcPosition));

    const npc = document.createElement('div');
    npc.style.backgroundImage = `url('./assets/npc${Math.floor(Math.random(1, 7) * 7) + 1}.png')`;
    console.log(npc.style.backgroundImage);
    npc.classList.add('npc');
    npc.style.width = '55px';
    npc.style.height = '70px';
    npc.style.position = 'absolute';
    npc.style.left = npcPosition.x + 'px';
    npc.style.top = npcPosition.y + 'px';
    if (isAshNPC) {
        npc.classList.add('ash-npc');
    }
    document.body.appendChild(npc);
}

function showDialogue(message, npc) {
    console.log(npc); 
    const dialogueBox = document.createElement('div');
    dialogueBox.classList.add('dialogue-box');
    dialogueBox.textContent = "NPC: " + message;

    const npcRect = npc.getBoundingClientRect();
    const npcPosition = {
        x: npcRect.left,
        y: npcRect.top
    };

    dialogueBox.style.position = 'absolute';
    dialogueBox.style.left = npcPosition.x + 'px';
    dialogueBox.style.top = (npcPosition.y + dialogueBox.offsetHeight + 40) + 'px';

    document.body.appendChild(dialogueBox);

    setTimeout(() => {
        dialogueBox.remove();
    }, 3000); 
}

function createCoordinatesDisplay() {
    coordinatesDisplay = document.createElement('div');
    coordinatesDisplay.classList.add('coordinates-display');
    document.body.appendChild(coordinatesDisplay);
}

function updateCoordinates() {
    const playerRect = player.getBoundingClientRect();
    const playerPosition = {
        x: Math.round(playerRect.left),
        y: Math.round(playerRect.top)
    };
    coordinatesDisplay.textContent = `Player Position: (${playerPosition.x}, ${playerPosition.y}) Max Steps: ${Maxstep} Steps Counter: ${stepsCounter}`;}

function getPlayerName() {
    if (document.cookie) {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === 'Name') {
                return cookieValue;
            }
        }
    }
    return null;
}

function handleKeyRelease(event) {
    const key = event.key;

    player.classList.remove('active');
}


function checkCollision(newPosition, playerRect) {
    for (const building of buildingAreas) {
        if (
            newPosition.x < building.x + building.width &&
            newPosition.x + playerRect.width > building.x &&
            newPosition.y < building.y + building.height &&
            newPosition.y + playerRect.height > building.y
        ) {
            return true; 
        }
    }
    return false; 
}

function checkCollisionWithBuildings(npcPosition) {
    for (const building of buildingAreas) {
        if (
            npcPosition.x < building.x + building.width &&
            npcPosition.x + 55 > building.x &&
            npcPosition.y < building.y + building.height &&
            npcPosition.y + 70 > building.y
        ) {
            return true; // Collision detected
        }
    }
    return false; // No collision
}

function Dig() {
    const playerRect = player.getBoundingClientRect();
    const playerPosition = {
        x: Math.round(playerRect.left),
        y: Math.round(playerRect.top)
    };

    // Check if player's position matches X_random and Y_random
    if (playerPosition.x === X_random && playerPosition.y === Y_random) {
        displayFlag();
    }
}

function displayFlag() {
    fetch('/flageee')
        .then(response => response.text())
        .then(flagContent => {
            const flagBox = document.createElement('div');
            flagBox.classList.add('flag-box');
            flagBox.textContent = flagContent;

            const X_random = Math.random() * window.innerWidth;
            const Y_random = Math.random() * window.innerHeight;

            flagBox.style.position = 'absolute';
            flagBox.style.left = X_random + 'px';
            flagBox.style.top = Y_random + 'px';

            document.body.appendChild(flagBox);
        })
        .catch(error => console.error('Error fetching the flag:', error));
}




document.addEventListener('keyup', handleKeyRelease);
