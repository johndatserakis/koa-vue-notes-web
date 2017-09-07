import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// Main Route
const Home = (resolve) => require(['@/components/Layouts/Home.vue'], resolve)

// User Routes
const Login = (resolve) => require(['@/components/User/Login.vue'], resolve)
const Signup = (resolve) => require(['@/components/User/Signup.vue'], resolve)
const Forgot = (resolve) => require(['@/components/User/Forgot.vue'], resolve)
const Reset = (resolve) => require(['@/components/User/Reset.vue'], resolve)

// Account
const Account = (resolve) => require(['@/components/Layouts/Account.vue'], resolve)
const CreateNote = (resolve) => require(['@/components/Layouts/CreateNote.vue'], resolve)
const EditNote = (resolve) => require(['@/components/Layouts/EditNote.vue'], resolve)

// Other
const NotFound = (resolve) => require(['@/components/Layouts/NotFound.vue'], resolve)

// Non route compoinent registering
Vue.component('navbar', require('@/components/Partials/Navbar.vue'))
Vue.component('footer-main', require('@/components/Partials/Footer.vue'))
Vue.component('sidebar', require('@/components/Partials/Sidebar.vue'))

const router = new Router({
    mode: 'history',
    routes: [
    { path: '*', component: NotFound, name: 'notFound', meta: {title: 'Not Found'} },
    { path: '/', component: Home, name: 'home', meta: {title: 'Home'} },
    { path: '/user/login', component: Login, name: 'login', meta: {title: 'Login'} },
    { path: '/user/signup', component: Signup, name: 'signup', meta: {title: 'Signup'} },
    { path: '/user/forgot', component: Forgot, name: 'forgot', meta: {title: 'Forgot'} },
    { path: '/user/reset', component: Reset, name: 'reset', meta: {title: 'Reset'} },
    { path: '/account', component: Account, name: 'account', meta: {title: 'Account', requiresAuth: true} },
    { path: '/createNote', component: CreateNote, name: 'createNote', meta: {title: 'Create Note', requiresAuth: true} },
    { path: '/editNote', component: EditNote, name: 'editNote', meta: {title: 'Edit Note', requiresAuth: true} }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    // Start our vue-progressbar
    router.app.$Progress.start()

    // To set the title of each route
    document.title = to.meta.title

    // Grab the accessToken and refreshToken. Dealing with the localStorage and Vuex has been tricky,
    // so we'll just set everything here at the top of the waterfall.
    let accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null
    let refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null

    // What we're accounting for is the instance of a reload, because up until then the user object will be
    // present if they've already logged in. So if an accessToken is present let's set the user object
    // and their access/refresh tokens.
    if (accessToken) {
        router.app.$options.store.dispatch('user/setUserAndTokens', {accessToken: accessToken, refreshToken: refreshToken})
    }

    // If the user's not logged in do not allow into protected pages.
    if (to.meta.requiresAuth && !router.app.$options.store.getters['user/user']) {
        next({name: 'home'})
    }

    next()
})

router.afterEach((to, from) => {
    // End our vue-progressbar
    router.app.$Progress.finish()
})

export default router
