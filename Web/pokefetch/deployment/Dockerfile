FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y curl wget gnupg lsb-release && \
    apt-get clean

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs && \
    apt-get clean

RUN wget https://dev.mysql.com/get/mysql-apt-config_0.8.15-1_all.deb

RUN dpkg -i mysql-apt-config_0.8.15-1_all.deb

RUN DEBIAN_FRONTEND="noninteractive" apt-get install -y mysql-server && \
    apt-get clean

RUN rm mysql-apt-config_0.8.15-1_all.deb

RUN mkdir -p /var/lib/mysql /var/run/mysqld && \
    chown -R mysql:mysql /var/lib/mysql /var/run/mysqld && \
    chmod 777 /var/run/mysqld

COPY mysql.sql /docker-entrypoint-initdb.d/mysql.sql

WORKDIR /app

COPY package.json .

RUN npm install -g npm

RUN npm install

COPY . .

EXPOSE 1337

CMD sh -c "service mysql start && mysql -h localhost -u root < /docker-entrypoint-initdb.d/mysql.sql && node app.js"
