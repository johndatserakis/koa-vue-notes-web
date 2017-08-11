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
    //Here we check if there is a present access token. What we're accounting for is the instance of a reload,
    //because up until then the user object will be present if they've already logged in. So if an accessToken is present
    //let's set the user object and their access tokens.
    if (router.app.$options.store.getters.accessToken) {
        router.app.$options.store.dispatch('setUserAndTokens', {accessToken: router.app.$options.store.getters.accessToken, refreshToken: router.app.$options.store.getters.refreshToken})
    }

    //If the user's not logged in do not allow into protected pages.
    if (to.meta.requiresAuth && !router.app.$options.store.state.user) {
        next({name: 'home'})
    }

    next()
})

export default router
