FROM python:3-alpine3.15

WORKDIR /usr/src/app

COPY src/ ./

ENV PORT=3002

EXPOSE 3002

CMD ["python3", "-m", "http.server", "3002"]