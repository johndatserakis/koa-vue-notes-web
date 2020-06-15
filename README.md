<p align="center"><a href="https://koa-vue-notes-web.innermonkdesign.com/" target="_blank"><img width="200" src="./public/koa-vue-notes-icon.png"></a></p>

<p align="center">
  <a href="http://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjohndatserakis%2Fkoa-vue-notes-web&text=Check%20out%20koa-vue-notes-web%20on%20GitHub&via=innermonkdesign">
  <img src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-vue-notes-web.svg?style=social" alt="Tweet"></a>
</p>

# Koa-Vue-Notes-Web

This is a simple SPA built using [Koa](http://koajs.com/) as the backend, [Vue](https://vuejs.org/) as the first frontend, and [React](https://reactjs.org) as the second frontend.

- [Frontend Vue GitHub](https://github.com/johndatserakis/koa-vue-notes-web)
- [Frontend Vue Demo](https://koa-vue-notes-web.innermonkdesign.com/)
- [Frontend React GitHub](https://github.com/johndatserakis/koa-react-notes-web)
- [Frontend React Demo](https://koa-react-notes-web.innermonkdesign.com/)
- [Backend Koa GitHub](https://github.com/johndatserakis/koa-vue-notes-api)

# Features
- Vue 2.6.11 (Initialized by Vue-CLI 3)
- TypeScript in as much as the app as possible... ha. Will update further when Vue3 is out.
- Storybook support
- Vue-Router
- Vuex
- Fully written using async/await
- Bootstrap 4 with Bootstrap-Vue
- SCSS
- Vuelidate validation library
- JWT for authentication
- Axios
- Vue-Progressbar
- Jest for testing
- And more...

# Installing / Getting started

``` bash
# Install dependencies
npm i

# Serve with hot reload at localhost:8080
npm run watch

# Build for production
npm run build

# Lint using eslint
npm run lint

# Run Storybook
npm run storybook:watch

# Run tests
npm run test:unit
npm run test:e2e
```

# General Information

This frontend is part of a pair of projects that serve a simple notes app. I chose a notes app because it gives you a good look at the different techniques used in both the frontend and backend world. What's really cool is these projects feature a fully fleshed-out user login/signup/forgot/reset authentication system using `JWT`.

For the base of the project make sure to check out the [Vue-CLI](https://github.com/vuejs/vue-cli) docs if you haven't already. The base of this project is laid out in the *Vue-CLI* way. I chose this path because Evan did a really great job thinking through the different aspects of laying out an application.

`VUE_APP_URL`, and `VUE_APP_API_URL` are the `.env` variables I set for use in the project. As Vue-CLI 3 mentions, you can separate the values between development and production by putting `.env.development` and `.env.production` for the `.env` file names. (In addition to having just a shared `.env` file if you like.) The big point here is `VUE_APP_API_URL` is what `axios` is going to use for its base URL - so keep that in mind.

I've liberally commented the code and tried to balance the project in a way that it's complex enough to learn from but not so complex that it's impossible to follow. It can be tough to learn from a boilerplate that has too much or too little.

Having used mainly PHP for the backend in the past - I am very glad I checked out Koa as I think it is absolutely awesome in the way it handles the server code. Same thing with Vue - I've used mainly jQuery in the past - albeit with the really structured Revealing-Module-Pattern - and using Vue was such a pleasure. You can really tell right away what kind of power a well-structured library can give you.

# TypeScript

This frontend is fully built in `TypeScript` which hopefully helps others who are looking for a working example of some different components. Even though I've been using `JavaScript` for about 10 years now, I only recently started using `TypeScript` over the past year or so. In the most recent revamp of this project I decided to rewrite it completely in `TypeScript` due to how much safety it brings - it really make me feel better about the foundation of the app. I really like `TypeScript` and will definitely be using it in all my `JavaScript` projects going forward - the only tough part is integrating third-party libraries (event those written in `TypeScript`), although after a few you get used to it.

Vue2 doesn't play perfectly with `TypeScript` though, so there are definitely some holes in the type-checking, especially when it comes to `Vuex`. But that should be cleared up in Vue3, and I'll make sure to keep this project up to date when that happends. This is one nice thing about React - because it's just raw TypeScript when using a `.tsx` file, it just works better with TypeScript out of the box.

The `src` folder is laid out in the following fashion:

# Assets

Here you'll find the program's `SCSS` files. There's a bunch of component files as you drill down.

Honestly, I really like `Bootstrap`, and v4 is very nice - but I'm not a huge fan of using its components because they still use jQuery. Also, I really wish it was written using the BEM syntax - something I use for my own components. `Bootstrap-Vue` is also killer and honestly one of the best component libraries I've used across Vue/React/Whatever.

# Common

For utlity functions. The `axios` export is here. If you've noticed - I actually import `axios` from here - not from the `npm_modules` folder. That's because I want to add the `baseURL` property in a single place.

# Components

Here are the `.vue` components that make up the app. This folder is further broken down into a few subfolders to keep the views organized. Pretty straight-forward. Because this app used Vuex the components only have local data when needed - like form elements. Otherwise I'm mapping out Vuex store variables in the `computed` section of each component using `mapGetters`.

# Router

This is the vue-router code. Here you'll find the creation and connection of each view in the app. One thing you're going to want to take a look at is the `beforeEach` method where we deal with the user authentication taking place in the app.

On each router action we grab the `accessToken` and `refreshToken` from our `localStorage`. If the `accessToken` is present we set the user in our Vuex store and continue on our way.

# User Authentication Process

As mentioned in the vue/koa code, the user authentication process is this:

- User create an account
- User logs in
- The server sends and `accessToken` and a `refreshToken` back
- We take the `accessToken` and decode it using `jwt-decode`. This gets us the logged in user's information. We stick this in the Vuex/Redux `user` store. Then we store the `refreshToken` and `accessToken` in the user's `localStorage`.
- Each protected endpoint will be expecting you to attach the `accessToken` you have to the call (using `Authentication: Bearer`)
- After a short amount of time, the server will respond with `401 TOKEN EXPIRED`. When you see this - that means you need to send your `refreshToken` and `user.email` to the endpoint that deals with `accessToken` refreshing.
- Once you do that, you'll received a brand new `accessToken` and `refreshToken`
- Repeat the process as needed

# Store

The store folder is where all the Vuex files are. We are using the modules feature of Vuex which allows us to have different stores for each module. In this app there are two modules - `user` and `note`. Vuex turned out to be really cool. One of the main things I'll point out is that each action should return a promise. If you follow this methodology you'll find it makes it really easy to keep in sync with a API call a component might make. (`axios` requests already are promises - so do the normal `return new Promise((resolve, reject) => { resolve('wow!') })` in other types of `action` cases.)

# App.vue file

This is our main app component. Things like the `navbar`, `footer-main`, and `vue-progress-bar` are placed here.

# main.js file

Our main entrance to our JavaScript code - all the main modules like our Vuex store and router are loaded here. This is also where our main Vue instance is implemented.

# Hit Me Up

Go ahead and fork the project! Message me here if you have questions or submit an issue if needed. I'll be making touch-ups as time goes on. Have fun with this!

# License

Copyright 2017 John Datserakis

[MIT](http://opensource.org/licenses/MIT)
