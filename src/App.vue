<template>
    <div id="app">
        <vue-progress-bar></vue-progress-bar>

        <navbar></navbar>

        <keep-alive include="account">
            <router-view></router-view>
        </keep-alive>

        <div class="sticky-footer-spacing"></div>
        <footer-main></footer-main>

        <v-dialog/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    @import 'https://cdn.jsdelivr.net/fontawesome/4.7.0/css/font-awesome.min.css';
</style>
