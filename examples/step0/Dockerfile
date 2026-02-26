FROM debian:trixie

RUN apt-get update && apt-get install -y \
    build-essential \
    nginx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY sensor.c .
RUN gcc -o sensor sensor.c

COPY html/ /var/www/html/
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 80

CMD ["/app/entrypoint.sh"]
