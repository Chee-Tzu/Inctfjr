let numImages = 16;
let currentScore = 0;

document.addEventListener('DOMContentLoaded', function () {
    this.location.pathname === '/' ? main() : enablePokedex();
});

function main() {
    for (let i = 0; i < numImages; i++) {
        spawnImage();
    }

    const animatedImages = document.querySelectorAll('.random-image');

    animatedImages.forEach(image => {
        image.removeEventListener('click', clickHandler);
        image.addEventListener('click', clickHandler);
    });

    animatedImages.forEach((image) => {
        animateImage(image);
    });
}

// Score to score;
function score(score) {
    const url = '/score';
     // Set the score in backend, so that it will never be lost!
    const formData = new URLSearchParams();
    formData.append('score', score);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            // Do nothing, trust me no errors ( ^ _ - )
        } else {
            return response.json();
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        // Do nothing
    });
}

function clickHandler(event) {
    const animatedImages = document.querySelectorAll('.random-image');
    const image = event.target;

    image.src = '/images/magneton.png';
    

    gsap.to(image, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power1',
        onComplete: function () {
            try {
                document.body.removeChild(image);
                score(currentScore++);
            } catch (error) {
                // Do nothing
            }
            if (animatedImages.length <= 6) {
                enablePokedex();
            }
        }
    });
}

function enablePokedex() {
    const pokedex = document.querySelector('main');

    pokedex.style.display = 'inline-block';
    gsap.to(pokedex, {
        scale: 0.8,
        y: 0,
        opacity: 1,
        duration: 2,
        ease: 'power4',
    });
}

function getRandomPosition(min, max, negative = false) {
    let randomNumber = Math.random() * (max - min) + min;
    if (negative && Math.random() < 0.5) {
        randomNumber = -randomNumber;
    }
    return randomNumber;
}

function getRandomDuration(min, max) {
    return Math.random() * (max - min) + min;
}

function spawnImage() {
    const image = document.createElement('img');
    image.src = '/images/magneton.gif';
    image.classList.add('random-image', 'unselectable');
    image.setAttribute('draggable', false);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomPositionX = getRandomPosition(0, screenWidth);
    const randomPositionY = getRandomPosition(0, screenHeight);
    const randomHeight = getRandomHeight(100, 150);

    image.style.position = 'absolute';
    image.style.left = randomPositionX + 'px';
    image.style.top = randomPositionY + 'px';
    image.style.height = randomHeight + 'px';

    document.body.appendChild(image);

    animateImage(image);
}

function getRandomHeight(minHeight, maxHeight) {
    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
}

function animateImage(imageElement) {
    const startX = parseFloat(imageElement.style.left);
    const startY = parseFloat(imageElement.style.top);
    const endX = getRandomPosition(0, window.innerWidth);
    const endY = getRandomPosition(0, window.innerHeight);
    const duration = getRandomDuration(2, 8);

    gsap.to(imageElement, {
        left: endX + 'px',
        top: endY + 'px',
        duration: duration,
        ease: 'linear',
        onComplete: function () {
            animateImageBack(imageElement, startX, startY);
        }
    });
}

function animateImageBack(imageElement, startX, startY) {
    const duration = getRandomDuration(2, 8);

    gsap.to(imageElement, {
        left: startX + 'px',
        top: startY + 'px',
        duration: duration,
        ease: 'linear',
        onComplete: function () {
            animateImage(imageElement);
        }
    });
}