<template>
    <div class="panel">

        <router-link class="btn btn-primary" :to="{name: 'home'}">Home</router-link>
        <router-link v-if="!user" class="btn btn-primary" :to="{name: 'signup'}">Signup</router-link>
        <router-link v-if="!user" class="btn btn-primary" :to="{name: 'login'}">Login</router-link>
        <router-link v-if="!user" class="btn btn-primary" :to="{name: 'forgot'}">Forgot</router-link>
        <!-- <router-link v-if="!user" class="btn btn-primary" :to="{name: 'reset'}">Reset</router-link> -->

        <span v-if="user">|</span>
        <router-link class="btn btn-primary" :to="{name: 'account'}" v-if="user">Account</router-link>
        <a class="btn btn-primary"  href="javascript:void(0)" v-if="user" v-on:click="logout">Logout</a>

    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name: 'navbar',
        methods: {
            logout() {
                this.$store.dispatch('userLogout', this.$router)
            }
        },
        computed: {
            ...mapState(['user'])
        }
    }
</script>

<style lang="sass" scoped>
</style>