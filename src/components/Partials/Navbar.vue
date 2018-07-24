<template>
    <div>
        <b-navbar toggleable="lg" type="dark" class="navbar-section">
            <b-navbar-brand :to="{name: 'home'}">
                <i class="fa fa-sticky-note fa-fw"></i> Koa-Vue-Notes
            </b-navbar-brand>

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav v-if="!user" class="mr-auto">
                    <b-nav-item :to="{name: 'login'}">
                        Login
                    </b-nav-item>

                    <b-nav-item :to="{name: 'signup'}">
                        Signup
                    </b-nav-item>

                    <b-nav-item :to="{name: 'forgot'}">
                        Forgot
                    </b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav v-if="user" class="mr-auto">
                    <b-nav-item :to="{name: 'account'}">
                        Account
                    </b-nav-item>

                    <a href="javascript:void(0)" v-if="user" v-on:click="logout()" class="nav-link">Logout</a>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <li class="nav-item">
                        <a href="https://johndatserakis.github.io/koa-react-notes-web/" class="navbar-text mr-sm-3" target="_blank">Visit the React Version!</a>
                    </li>
                    <li class="nav-item">
                        <a href="https://github.com/johndatserakis/koa-vue-notes-web" class="navbar-text mr-sm-3" target="_blank">Web Code</a>
                    </li>
                    <li class="nav-item">
                        <a href="https://github.com/johndatserakis/koa-vue-notes-api" class="navbar-text mr-sm-3" target="_blank">API Code</a>
                    </li>
                    <li class="nav-item">
                        <a href="https://github.com/johndatserakis/" class="navbar-text mr-sm-3" target="_blank"><i class="fa fa-info-circle fa-fw"></i></a>
                    </li>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'navbar',
    data () {
        return {}
    },
    methods: {
        async logout () {
            // As you can see, with Vuex we we need to fire logout methods
            // for each of our modules.
            await this.$store.dispatch('user/userLogout')
            await this.$store.dispatch('note/userLogout')
            this.$router.push({name: 'home'})

            // After logging the user out we need to refresh the page
            // this is because some of our components initialize on their
            // created methods - and when a user logs out they need to be
            // fully cleared.
            // location.reload()
            document.location.href = '/'
        }
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/app.scss';

    .fa-sticky-note {
        color: yellow;
    }

    //This is for the full bleed background
    //when using a container
    .navbar-section {
        background-color: $blue;
        margin-bottom: 20px;

        .container-nav {
            padding-left: 0;
            padding-right: 90;
        }

        .navbar {
            margin-bottom: 20px;
        }
    }

    // //When using fixed-top navbar, add this.
    // .sticky-nav-spacer {
    //     margin-top: 78px;
    // }
</style>
