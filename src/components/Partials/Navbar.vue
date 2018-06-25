<template>
    <div class="navbar-section">
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-dark">
                <router-link class="navbar-brand" :to="{name: 'home'}" exact data-target=".show" data-toggle="collapse"> <i class="fa fa-sticky-note fa-fw"></i> Koa-Vue-Notes</router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li v-if="!user" class="nav-item">
                            <router-link :to="{name: 'signup'}" data-target=".show" data-toggle="collapse" class="nav-link">Signup</router-link>
                        </li>
                        <li v-if="!user" class="nav-item">
                            <router-link :to="{name: 'login'}" data-target=".show" data-toggle="collapse" class="nav-link">Login</router-link>
                        </li>
                        <li v-if="!user" class="nav-item">
                            <router-link :to="{name: 'forgot'}" data-target=".show" data-toggle="collapse" class="nav-link">Forgot</router-link>
                        </li>

                        <li v-if="user" class="nav-item">
                            <router-link :to="{name: 'account'}" data-target=".show" data-toggle="collapse" class="nav-link">Account</router-link>
                        </li>
                        <li v-if="user" class="nav-item">
                            <a href="javascript:void(0)" v-if="user" v-on:click="logout()" class="nav-link">Logout</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a href="https://johndatserakis.github.io/koa-react-notes-web/" class="btn btn-white my-2 my-lg-0 mr-sm-2" target="_blank"><i class="fa fa-github fa-fw"></i> Visit the React Version!</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://github.com/johndatserakis/koa-vue-notes-web" class="btn btn-white my-2 my-lg-0 mr-sm-2" target="_blank"><i class="fa fa-github fa-fw"></i> Web Code on GitHub</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://github.com/johndatserakis/koa-vue-notes-api" class="btn btn-white my-2 my-lg-0 mr-sm-2" target="_blank"><i class="fa fa-github fa-fw"></i> API Code on GitHub</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://github.com/johndatserakis/" class="btn btn-white my-2 my-lg-0 mr-sm-2" target="_blank"><i class="fa fa-info-circle fa-fw"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
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
