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

                    <hr>

                    <p>
                        <a href="https://github.com/johndatserakis/koa-vue-notes-web" target="_blank"><img src="https://img.shields.io/badge/frontend--social.svg?style=social" alt=""></a>

                        <a href="https://twitter.com/intent/tweet?text=Check+out+this+project+on+GitHub:+https://github.com/johndatserakis/koa-vue-notes-web&url=%5Bobject%20Object%5D" target="_blank"><img src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-vue-notes-web.svg?style=social" alt=""></a>

                        <a href="https://raw.githubusercontent.com/johndatserakis/koa-vue-notes-web/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt=""></a>

                        <a href="https://github.com/johndatserakis/koa-vue-notes-web/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/johndatserakis/koa-vue-notes-web.svg" alt=""></a>

                        <a href="https://github.com/johndatserakis/koa-vue-notes-web/network" target="_blank"><img src="https://img.shields.io/github/forks/johndatserakis/koa-vue-notes-web.svg" alt=""></a>
                    </p>

                    <p>
                        <a href="https://github.com/johndatserakis/koa-vue-notes-api" target="_blank"><img src="https://img.shields.io/badge/Backend--social.svg?style=social" alt=""></a>

                        <a href="https://twitter.com/intent/tweet?text=Check+out+this+project+on+GitHub:+https://github.com/johndatserakis/koa-vue-notes-api&url=%5Bobject%20Object%5D" target="_blank"><img src="https://img.shields.io/twitter/url/https/github.com/johndatserakis/koa-vue-notes-api.svg?style=social" alt=""></a>

                        <a href="https://raw.githubusercontent.com/johndatserakis/koa-vue-notes-api/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt=""></a>

                        <a href="https://github.com/johndatserakis/koa-vue-notes-api/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/johndatserakis/koa-vue-notes-api.svg" alt=""></a>

                        <a href="https://github.com/johndatserakis/koa-vue-notes-api/network" target="_blank"><img src="https://img.shields.io/github/forks/johndatserakis/koa-vue-notes-api.svg" alt=""></a>
                    </p>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'home',
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        },
        mounted () {
        }
    }
</script>

<style lang="scss" scoped>
</style>
