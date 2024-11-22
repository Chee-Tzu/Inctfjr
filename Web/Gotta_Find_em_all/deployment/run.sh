#!/bin/bash
read -p "[+] Enter port number (e.g., 1337): " port

if [[ -z "$port" || ! "$port" =~ ^[0-9]+$ ]]; then
    echo "[-] Invalid port number"
    exit 1
fi

docker build -t rce . && \
    clear && \
    echo "[+] BUILD SUCCESS" && \
    echo "[+] Running on http://0.0.0.0:$port" && \
    docker run -p "$port":1410 rce