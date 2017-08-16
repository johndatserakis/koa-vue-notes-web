<template>
    <div class="navbar-section">
        <div class="container container-nav">
            <nav class="navbar navbar-expand-lg navbar-dark">
                <router-link class="navbar-brand" :to="{name: 'home'}" exact>Koa-Vue-Notes</router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li v-if="!user" class="nav-item">
                            <router-link :to="{name: 'signup'}" class="nav-link">Signup</router-link>
                        </li>
                        <li v-if="!user" class="nav-item">
                            <router-link :to="{name: 'login'}" class="nav-link">Login</router-link>
                        </li>
                        <li v-if="!user" class="nav-item">
                            <router-link :to="{name: 'forgot'}" class="nav-link">Forgot</router-link>
                        </li>

                        <li v-if="user" class="nav-item">
                            <router-link :to="{name: 'account'}" class="nav-link">Account</router-link>
                        </li>
                        <li v-if="user" class="nav-item">
                            <router-link :to="{name: 'createNote'}" class="nav-link">Create Note</router-link>
                        </li>
                        <li v-if="user" class="nav-item">
                            <a href="javascript:void(0)" v-if="user" v-on:click="logout()" class="nav-link">Logout</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a href="https://github.com/johndatserakis/koa-vue-notes-web" class="nav-link" target="_blank"><i class="fa fa-github fa-fw"></i> Web Code on GitHub</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://github.com/johndatserakis/koa-vue-notes-api" class="nav-link" target="_blank"><i class="fa fa-github fa-fw"></i> API Code on GitHub</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://github.com/johndatserakis/" class="nav-link" target="_blank"><i class="fa fa-info-circle fa-fw"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name: 'navbar',
        methods: {
            logout() {
                this.$store.dispatch('user/userLogout', this.$router)
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        }
    }
</script>

<style lang="sass" scoped>
</style>