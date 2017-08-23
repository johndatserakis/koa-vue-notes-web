<template>
    <section class="main-content">
        <div class="container">
            <div class="row">

                <div class="col-md-12">
                    <h1>Home</h1>

                    <p>Here will be a check to see if you are currently logged in and your user info.</p>

                    <p v-if="user"><i class="fa fa-user fa-fw"></i>  You: {{user}}</p>
                    <p v-else>Hmm, you are not logged in.</p>

                    <p><i class="fa fa-info-circle fa-fw"></i> This is a simple SPA built using Koa (2.3) as the backend and Vue (2.4) as the frontend. If you don't want to create an account you can just use <strong>demousername</strong> and <strong>demopassword</strong> to login to the app.</p>
                </div>

            </div>
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
