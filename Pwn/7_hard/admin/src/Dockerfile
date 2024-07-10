FROM ubuntu:22.04

RUN export TERM="xterm-256color"

RUN apt-get -y update && \
    apt-get -y upgrade

RUN useradd -m ctf
RUN echo "ctf:ctf" | chpasswd
WORKDIR /home/ctf

COPY buggy-calc .
COPY flag.txt .
COPY ynetd .
COPY libc.so.6 .
COPY ld-linux-x86-64.so.2 .

RUN chown -R root:root /home/ctf
RUN chmod -R 555 /home/ctf

USER ctf
EXPOSE 1338
CMD ./ynetd -p 1338 ./buggy-calc
