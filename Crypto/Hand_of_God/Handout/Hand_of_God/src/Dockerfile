#sudo docker build -t hand_of_god .
#sudo docker run -d -p 5000:5000 --rm hand_of_god

FROM python:alpine

RUN apk update
RUN apk add socat

RUN adduser -D ctf -u 1000 -g 1000

### diretory setting
COPY --chown=ctf:ctf ./challenge.py /home/ctf/chall.py

USER ctf

RUN pip install --upgrade pip

EXPOSE 5000

WORKDIR /home/ctf

CMD ["/usr/bin/socat", "tcp-listen:5000,reuseaddr,fork", "exec:\"python3 -u /home/ctf/chall.py\""]
