docker build -t pokefy . && \
    clear && \
    echo "[+] BUILD SUCCESS" && \
    docker run -p 1337:1337 pokefy