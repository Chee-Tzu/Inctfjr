document.addEventListener('DOMContentLoaded', function () {
    main();
});

async function main() {
    try {
        const navLinks = document.querySelectorAll('nav ul li');
        const count = document.querySelector('.count');
        const btn = document.querySelectorAll('.btn');
        const pokeName = document.querySelector('#name h3');

        navLinks.forEach(link => {
            link.addEventListener('click', async (event) => {
                try {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    event.target.classList.add('active');
                    location.href = event.target.dataset.href;
                } catch (error) {
                    console.error('Error in nav link click event:', error);
                }
            });
        });

        const currentPathname = window.location.pathname;
        navLinks.forEach(link => {
            if (link.dataset.href === currentPathname) {
                link.classList.add('active');
            }
        });
        const countValue = count.innerText.replace(/^Collected: /, '');
        if (isNaN(parseInt(countValue)) || parseInt(countValue) >= 10) {
            pokeName.innerText = "Max";
            btn.forEach(button => {
                button.setAttribute('disabled', '');
            });
        } else {
            flipCard();
            handleClick();
        }
    } catch (error) {
        // Do nothing
    }
}

async function handleClick() {
    try {
        const pokeball = document.querySelector('.pokeball');
        const selectBtn = document.getElementById('submit');
        const pokeName = document.querySelector('#name h3');

        selectBtn.addEventListener('click', async (event) => {
            pokeball.removeAttribute('hidden');
            pokeName.style.display = 'none';
            const response = await fetch('/pokefy', {
                method: 'POST',
            });
            const json = await response.json();

            if ('error' in json) {
                pokeball.setAttribute('hidden', true);
                pokeName.style.display = 'block';
                pokeName.innerText = json.error;
            } else {
                location.reload();
            }
        });
    } catch (error) {
        // Do nothing
    }
}

async function fetchPokefy() {
    try {
        const url = `https://api.pokemontcg.io/v2/cards/xy${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 25) + 1}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'b80e190f-4e92-47fa-9bb7-52b2479d766a',
            },
        });

        const json = await response.json();
        document.cookie = `name=${btoa(json.data.name)}; path=/`;
        document.cookie = `url=${btoa(json.data.images.small)}; path=/`;
        return [json.data.name, json.data.images.small];

    } catch (error) {
        return ["Pokéfy, Error!", "/images/default.png"];
    }
}

async function flipCard() {
    try {
        const cardInner = document.querySelector('.card-inner');
        const pokeName = document.querySelector('#name h3');
        const pokeball = document.querySelector('.pokeball');
        const revealBtn = document.getElementById('reveal');
        const selectBtn = document.getElementById('submit');
        const cardBack = document.querySelector('.card-back');

        let isFlipped = false;

        revealBtn.addEventListener('click', async () => {
            try {
                pokeName.style.display = 'none';
                pokeball.removeAttribute('hidden');

                if (!isFlipped) {
                    const [name, pokefy] = await fetchPokefy();
                    cardBack.querySelector('img').src = pokefy;
                    cardBack.querySelector('img').onload = () => {
                        setTimeout(() => {
                            cardInner.style.transform = 'rotateY(180deg)';
                        }, 100);
                        pokeball.setAttribute('hidden', true);
                        pokeName.style.display = 'block';
                        pokeName.innerText = name;
                        revealBtn.textContent = 'Change';
                        selectBtn.removeAttribute('disabled');
                        isFlipped = true;
                    };
                } else {
                    selectBtn.setAttribute('disabled', '');
                    cardInner.style.transform = 'rotateY(0deg)';
                    document.cookie = 'url=';
                    document.cookie = 'name=';
                    pokeball.setAttribute('hidden', true);
                    pokeName.style.display = 'block';
                    revealBtn.textContent = 'Reveal';
                    pokeName.innerText = 'Reveal?';
                    setTimeout(() => {
                        cardBack.querySelector('img').src = "#";
                    }, 100);
                    isFlipped = false;
                }
            } catch (error) {
                // Do nothing
            }
        });
    } catch (error) {
        // Do nothing
    }
}
