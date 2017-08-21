<template>
    <div class="col-12 d-sm-block d-md-none mb-2">
        <button class="btn btn-primary btn-sm" type="button" data-toggle="collapse" data-target="#sidebar-items" aria-expanded="false" aria-controls="sidebar-items">MENU</button>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
        name: 'sidebar-collapse-button',
    }
</script>

<style lang="scss" scoped>
</style>