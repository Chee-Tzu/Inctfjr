FROM php:7.4-apache

RUN mkdir -p /var/log/httpd

RUN apt-get update && \
    apt-get install -y libexif-dev libmagickwand-dev && \
    pecl install imagick && \
    docker-php-ext-enable imagick && \
    docker-php-ext-install exif

RUN mkdir -p /var/www/html/Uploads && \
    chown -R www-data:www-data /var/www/html

COPY --chown=www-data:www-data ./src /var/www/html

COPY --chown=www-data:www-data ./flag.txt /

WORKDIR /var/www/html/

EXPOSE 80

CMD ["apache2-foreground"]
