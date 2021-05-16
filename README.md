# Project_Planner_App

https://project-planning-web.herokuapp.com/

## Description

### Problem statement

There might be multiple projects going on at the same time and it is difficult to track all the progress of each project. This might cause confusion in the ideas and progression of each project and deadlines may be missed or losing tracking of what your teammates did.

### Solution

An all in one app for all the projects for yourself or your team to have an easier time managing your projects. You can add in different users to different projects and have a better overall view of all the projects going on.

### Features

- Users can create their own projects, search and add different teammates into the project
- Users are able to add in different title and points to do
![Animation6](https://user-images.githubusercontent.com/78722564/118404351-2e71c880-b6a5-11eb-8846-b6ecfd1749ac.gif)

- Users are able to assign task to specific individual
![Animation7](https://user-images.githubusercontent.com/78722564/118404355-2fa2f580-b6a5-11eb-8ec3-149d6988048b.gif)

- Users are able to join a chatroom and discuss their ideas
![Animation8](https://user-images.githubusercontent.com/78722564/118404440-6bd65600-b6a5-11eb-9e12-9e2793121132.gif)

- Users are able to check the project activity history
![imageproject](https://user-images.githubusercontent.com/78722564/118404325-100bcd00-b6a5-11eb-9c1d-5e8b0ecc84d2.png)

- Users are able to check the project overview by clicking the gantt chart
- Users are also to choose a new background by clicking random background

## Technologies used

ReactJS, Redux, Socket.io, JWT, Framer-motion, Material UI, Fusioncharts, Gravatar, Express, MongoDB and NodeJs  
API used: Unsplash

## Install

To run this, NodeJS and npm are required

```
npm install
```

Next, create a .env file and put in your secret keys for TMDB and youtube

```
MONGO_URI=<MongoDB link>
JWT_SECRET=<Secret Key>
REACT_APP_UNSPLASH_KEY=<Secret Key>
```

After completed, just do a npm run
