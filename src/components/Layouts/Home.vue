<template>
    <section class="main-content">
        <div class="container">

            <h1>Home</h1>

            <p>Here will be a check to see if you are currently logged in and your user info.</p>

            <p v-if="user">You: {{user}}</p>
            <p v-else>Hmm, you are not logged in.</p>

        </div>
    </section>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name: 'home',
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
</style>
