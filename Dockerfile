FROM debian:latest
RUN apt-get update && apt-get install -y \
    apache2 \
    && rm -rf /var/lib/apt/lists/*

COPY Problema1.html /var/www/html/
COPY data.json /var/www/html/
COPY js /var/www/html/js

EXPOSE 80

# Iniciar Apache en primer plano
CMD ["apachectl", "-D", "FOREGROUND"]

