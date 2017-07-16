<template>
    <div class="panel">
        <router-link to="/">Home</router-link>
        /
        <router-link to="/user/signup">Signup</router-link>
        /
        <router-link to="/user/login">Login</router-link>
        /
        <router-link to="/user/forgot">Forgot</router-link>
        /
        <router-link to="/user/reset">Reset</router-link>
        /
        <router-link to="/user/logout">Logout</router-link>
        /
        <router-link to="/account">Account</router-link>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        mounted() {
        },
        computed: {
            ...mapState(['user'])
        }
    }
</script>

<style lang="sass" scoped>
</style>