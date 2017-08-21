<template>
    <div class="col-md-3 collapse d-md-block" id="sidebar-items">
        <div class="sidebar-items">

            <div class="sidebar-items__sidebar-item sidebar-items__sidebar-item--header">MENU</div>

            <router-link v-for="link in links" v-bind:key="link.name" :to="{name: link.to}" class="sidebar-items__sidebar-item">
                <i :class="link.icon"></i> {{link.name}}
            </router-link>

        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name: 'sidebar',
        props: ['links'],
        methods: {
        },
        computed: {
        }
    }
</script>

<style lang="scss" scoped>
</style>