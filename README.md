# Frontend_CICD
## _Frontend app for my CICD project_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Features

- Add new users to the database
- Add description for every user
- Show all users available
- Edit users
- Delete Users

## Tech

The application uses a number of open source projects to work properly:

- [ReactJS] - HTML enhanced for web apps!
- [Antd] - great UI boilerplates for modern web apps

## Installation

The application requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd frontend
npm i
npm start
```

For production environments using docker...

```sh
docker build -t <youruser>/frontend:{version} . 
docker run -p 3000:3000 <youruser>/frontend:{version}
```

## Docker

The application is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 3000, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd dillinger
docker build -t <youruser>/frontend:{version} .
```

This will create the applicatio image and pull in the necessary dependencies.
Be sure to swap out `{version}` with the actual
version of the application.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 3000 of the host to
port 3000 of the Docker:

```sh
docker run -d -p 3000:3000 <youruser>/frontend:{version}
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:3000
```
