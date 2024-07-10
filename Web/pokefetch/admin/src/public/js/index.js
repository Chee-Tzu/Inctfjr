document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('bg-video');
    video.play();

    main();
});

async function main() {
    const input = document.querySelector('input');

    input.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            const value = input.value;
            input.value = '';
            if (value.trim() === '') {
                displayResponse({empty: "Enter a pokemon name!"})
            } else {
                const pokeData = await pokeFetch(value);
                displayResponse(pokeData);
            }
        }
    });
}

async function pokeFetch(pokemon) {
    const responseContainer = document.getElementById('responseContainer');
    const loading = document.getElementsByClassName('pokeball')[0];
    try {
        const table = document.querySelector('.response-table');
        responseContainer.removeChild(table);
    } catch (error) {
        // Do nothing
    }
    responseContainer.style.display = 'flex';
    loading.style.display = 'block';
    const params = new URLSearchParams();
    params.append('pokemon', pokemon.toLowerCase());

    try {
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Error fetching data' };
    }
}


function toTitleCase(value) {
    if (Array.isArray(value)) {
        return value.map(item => toTitleCase(item)).join(', ');
    } else if (typeof value === 'string') {
        let start = value.slice(0, 1);
        start = start.toUpperCase();

        return start + value.slice(1);
    } else {
        return value;
    }
}

async function displayResponse(json) {
    const responseContainer = document.getElementById('responseContainer');
    const loading = document.getElementsByClassName('pokeball')[0];

    const table = document.createElement('table');
    table.classList.add('response-table');

    Object.keys(json).forEach(key => {
        const tr = document.createElement('tr');
        const tdKey = document.createElement('td');
        const tdValue = document.createElement('td');

        tdKey.textContent = toTitleCase(key);
        tdValue.textContent = toTitleCase(json[key]);

        tr.appendChild(tdKey);
        tr.appendChild(tdValue);
        table.appendChild(tr);
    });

    loading.style.display = 'none';
    responseContainer.appendChild(table);
}

