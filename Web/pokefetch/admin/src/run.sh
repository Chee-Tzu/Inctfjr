docker build -t pokefetch . && \
    clear && \
    echo "[+] BUILD SUCCESS" && \
    docker run -p 1337:1337 pokefetch