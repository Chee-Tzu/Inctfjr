docker build -t magnattack . && \
    clear && \
    echo "[+] BUILD SUCCESS" && \
    docker run -p 1337:1337 magnattack