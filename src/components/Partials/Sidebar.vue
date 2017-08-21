<template>
    <div>

        <div class="d-sm-block d-md-none mb-2">
            <button v-on:click="menuIsVisible = !menuIsVisible" class="btn btn-primary btn-sm" type="button">MENU</button>
        </div>

        <div class="d-none d-md-block" id="sidebar-items">
            <div class="sidebar-items">
                <div class="sidebar-items__sidebar-item sidebar-items__sidebar-item--header">MENU</div>
                <router-link v-for="link in links" v-bind:key="link.name" :to="{name: link.to}" class="sidebar-items__sidebar-item">
                    <i :class="link.icon"></i> {{link.name}}
                </router-link>
            </div>
        </div>

        <div v-if="menuIsVisible" class="d-sm-block d-md-none" id="sidebar-items">
            <div class="sidebar-items">
                <div class="sidebar-items__sidebar-item sidebar-items__sidebar-item--header">MENU</div>
                <router-link v-for="link in links" v-bind:key="link.name" :to="{name: link.to}" class="sidebar-items__sidebar-item">
                    <i :class="link.icon"></i> {{link.name}}
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name: 'sidebar',
        props: ['links'],
        data: function () {
            return {
                menuIsVisible: false
            }
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<style lang="scss" scoped>
</style>