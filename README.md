# Project_Planner_App

## Description

### Problem statement

There might be multiple projects going on at the same time and it is difficult to track all the progress of each project. This might cause confusion in the ideas and progression of each project and deadlines may be missed or losing tracking of what your teammates did.

### Solution

An all in one app for all the projects for yourself or your team to have an easier time managing your projects. You can add in different users to different projects and have a better overall view of all the projects going on.

### Features

- Users can create their own projects, search and add different teammates into the project.
- Users are able to add in different title and points to do

- Users are able to join a chatroom and discuss their ideas

- Users are able to assign task to specific individual

- Users are able to check the project overview by clicking the gantt chart
- Users are also to choose a new background by clicking random background

## Technologies used

ReactJS, Redux, Socket.io, JWT, Express, MongoDB and NodeJs
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
