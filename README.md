<p align="center"><a href="https://vuejs.org" target="_blank"><img width="200" src="./static/koa-vue-notes-icon.png"></a></p>

# Koa-Vue-Notes-Web

This is a simple SPA built using [Koa](http://koajs.com/) (2.3) as the backend and [Vue](https://vuejs.org/) (2.3) as the frontend. Click [here](https://github.com/johndatserakis/koa-vue-notes-api) to see the backend Koa code.

## Features
- Vue 2.3 (Initialized by Vue-CLI with Webpack)
- Vue-Router
- Vuex
- Bootstrap 4 Beta
- SASS
- Vuelidate validation library
- Vue-Toasted toast messages
- JWT for authentication
- Axios
- Font-Awesome
- And more...


## Installing / Getting started

``` bash
## install dependencies
npm install

## serve with hot reload at localhost:8080
npm run watch

## build for production with minification
npm run build
```

## General Information

This frontend is part of a pair of projects that serve a simple notes app. I chose a notes app because it give you a good look at a lot of the different actions you can make on an element in both the frontend and backend world. What's really cool is these projects feature a fully fleshed-out user login/signup/forgot/reset authentication system using JWT.

For the base of the project make sure to check out the [Vue-CLI](https://github.com/vuejs/vue-cli) docs if you haven't already because the base of this project is laid out in the *Vue-CLI* way. I chose this path because Evan did a really great job thinking through the different aspects of laying out an application. `NODE_ENV`, `API_URL`, and `APP_URL` are some `.env` variables I've added in `config` and use throughout the code - so keep an eye out for those and replace them with your relevant information.

I've liberally commented the code and tried to balance the project in a way  that it was complex enough to learn from but not so complex that it's impossible to follow. It can be tough to learn from a boilerplate that has too much or too little.

Having used mainly PHP for the backend in the past - I am very glad I checked out Koa as I think it is absolutly awesome in the way it handles the server code. Same thing with Vue - I've used mainly jQuery in the past - albeit with the really structured Revealing-Module-Pattern - and using Vue was such a pleasure. You can really tell right away what kind of power a well-structed library can give you.

The `src` folder is laid out in the following fashion:

### assets

Here you'll find the program's SASS files. There's a bunch of component files as you drill down. I do use some of the .vue style concepts on certain components - but there is most definitely a case to be made for having all your base style code in one place. We're also importing Font-Awesome icons in `src/App.js`.

### common

For utlity functions.

### components

Here are the .vue components that make up the app. This folder is further broken down into a few subfolders to keep the views organized. Pretty straight-forward. Because this app used Vuex the components only have local data when needed - like form elements. Otherwise I'm mapping out Vuex store variables in the `computed` section of each component.

### router

This is the vue-router code. Here you'll find the creation and connection of each view in the app. One thing you're going to want to take a look at is the `beforeEach` method where we deal with the user authentication taking place in the app.

On each router action we grab the `accessToken` and `refreshToken` from our `localStorage`. If the `accessToken` is present we set the user in our Vuex store and continue on our way.

As mentioned in the backend code, the user authentication process is this:

- User create an account
- User logs in
- The server sends and `accessToken` and a `refreshToken` back
- We take the `accessToken` and decoded it using `jwt-decode`. This gets us the logged in user's information. We stick this in the Vuex variable `user`. Then we store the `refreshToken`.
- Each protected endpoint will be expecting you to attach the `accessToken` you have to the call (using Authentication: Bearer). After a short amount of time, the server will respond with `401 TOKEN EXPIRED`. When you see this - that means you need to send your `refreshToken` and `user.email` to the endpoint that deals with `accessToken` refreshing. Once you do that, you'll recieved a brand new `accessToken` and `refreshToken`.
- Repeate the process as needed.

This gets a little tricky when dealing with automatically resending api calls that have failed. At first I tried to utilize Axios interceptors - which worked great - but then I couldn't rerun the api call from the component in it's natural state. This had the side effect of loading-spinners not being stopped and information not being synced. What I settled on was each Vuex action call from a component having a `checkRefreshTokensAndResend()` function that is set to go off if a `401 TOKEN EXPIRED` message is recieved from the backend. This works really well and provides a seemless experience to the user. Feels a bit hacky though so I'll be studying the material and measuring this solution.

### store

The store folder is where all the Vuex files are. We are using the modules feature of Vuex which allows us to have different stores for each module. In this app there are two modules - `user` and `note`. Vuex turned out to be really cool. One of the main things I'll point out is that each action should return a promise. If you follow this methodology you'll find it makes it really easy to keep in sync with a API call a component might make.

## Hit Me Up

Go ahead and fork the project! Message me here if you have questions or submit an issue if needed. I'll be making touch-ups as time goes on. Have fun with this!


## License

Copywrite 2017 John Datserakis

[MIT](http://opensource.org/licenses/MIT)