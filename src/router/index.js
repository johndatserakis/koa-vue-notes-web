import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Main Route
const Home = (resolve) => require(['@/components/Layouts/Home.vue'], resolve)

// User Routes
const Login = (resolve) => require(['@/components/User/Login.vue'], resolve)
const Signup = (resolve) => require(['@/components/User/Signup.vue'], resolve)
const Logout = (resolve) => require(['@/components/User/Logout.vue'], resolve)
const Forgot = (resolve) => require(['@/components/User/Forgot.vue'], resolve)
const Reset = (resolve) => require(['@/components/User/Reset.vue'], resolve)

//Account
const Account = (resolve) => require(['@/components/Layouts/Account.vue'], resolve)

// Other
const NotFound = (resolve) => require(['@/components/Layouts/NotFound.vue'], resolve)

//Non route compoinent registering
Vue.component('navbar', require('@/components/Partials/Navbar.vue'));

const router = new Router({
  mode: 'history',
  // base: __dirname,
  routes: [
    { path: '*', component: NotFound, name: 'notFound' },
    { path: '/', component: Home, name: 'home' },
    { path: '/user/login', component: Login, name: 'login' },
    { path: '/user/signup', component: Signup, name: 'signup' },
    { path: '/user/logout', component: Logout, name: 'logout' },
    { path: '/user/forgot', component: Forgot, name: 'forgot' },
    { path: '/user/reset', component: Reset, name: 'reset' },
    { path: '/account', component: Account, name: 'account', meta: {requiresAuth: true} }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
    // // First we'll check if they're logged in. If not, we'll
    // // check an accessToken they may have to log them back in
    // if (!router.app.$options.store.state.authenticated) {
    //     router.app.$options.store.dispatch('getAuthenticatedUser')
    //     .then(() => {
    //         // They're logged in alright - so send them on their way -
    //         // even if they're going to an authorized page
    //         next()
    //     })
    //     .catch((error) => {
    //         // The user is not logged in, so do not allow them
    //         // access to authorized pages. Send them to the homepage.
    //         if (to.meta.requiresAuth) {
    //             next('/')
    //         } else {
    //             next()
    //         }

    //     })
    // } else {
    //     // Just like in the flow above, if the user is logged in
    //     // successfully, go ahead and send them on their way - even
    //     // if they're going to an authenticated page
    //     next()
    // }

    next()
})

export default router
