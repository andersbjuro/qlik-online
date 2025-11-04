$env:DOCKER_BUILDKIT = 1

docker build -t fa-online-app:dev -f .\Dockerfile .
#docker push forba/fa-catalog-app:dev
