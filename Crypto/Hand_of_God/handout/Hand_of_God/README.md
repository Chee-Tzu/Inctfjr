# Prerequisites

+ Have WSL enabled or any Linux distro installed
+ Have the latest version of Docker


# Commands

Go to the folder where the Dockerfile is found, then execute the follow commands:

+ sudo docker build -t hand_of_god .
+ sudo docker run -d -p 5000:5000 --rm hand_of_god

To check the docker images:

- docker ps