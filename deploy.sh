#!/bin/sh

docker build -t supakitdocker/image_name:tag .

docker build -t supakitdocker/weather-app:latest .

docker push supakitdocker/weather-app:latest

docker run -d -p 80:80 supakitdocker/weather-app:latest
