<template>
    <div>

        <div v-if="items.length > 0">

            <div class="d-sm-block d-md-none mb-2">
                <button v-on:click="menuIsVisible = !menuIsVisible" class="btn btn-primary btn-sm" type="button">MENU</button>
            </div>

            <!-- Smaller Screens -->
            <div v-if="menuIsVisible" class="d-sm-block d-md-none" id="sidebar-items">
                <div class="sidebar-items">
                    <div class="sidebar-items__sidebar-item sidebar-items__sidebar-item--header">MENU</div>

                    <div v-for="item in items" :key="item.name">

                        <router-link v-if="item.type === 'link'" v-bind:key="item.name" :to="{name: item.to}" class="sidebar-items__sidebar-item"><i :class="item.icon"></i> {{item.name}}</router-link>

                        <a v-if="item.type === 'back'" href="javascript:void(0)" v-bind:key="item.name" v-on:click="goBack()" class="sidebar-items__sidebar-item"><i :class="item.icon"></i> Back</a>

                        <a v-if="item.type === 'function'" href="javascript:void(0)" v-bind:key="item.name"  v-on:click="$router.app.$emit(item.functionName)" class="sidebar-items__sidebar-item"><i :class="item.icon"></i> {{item.name}}</a>

                    </div>

                </div>
            </div>

            <!-- Larger screens -->
            <div class="d-none d-md-block" id="sidebar-items">
                <div class="sidebar-items">
                    <div class="sidebar-items__sidebar-item sidebar-items__sidebar-item--header">MENU</div>

                    <div v-for="item in items" :key="item.name">

                        <router-link v-if="item.type === 'link'" v-bind:key="item.name" :to="{name: item.to}" class="sidebar-items__sidebar-item"><i :class="item.icon"></i> {{item.name}}</router-link>

                        <a v-if="item.type === 'back'" href="javascript:void(0)" v-bind:key="item.name" v-on:click="goBack()" class="sidebar-items__sidebar-item"><i :class="item.icon"></i> Back</a>

                        <a v-if="item.type === 'function'" href="javascript:void(0)" v-bind:key="item.name"  v-on:click="$router.app.$emit(item.functionName)" class="sidebar-items__sidebar-item"><i :class="item.icon"></i> {{item.name}}</a>

                    </div>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    name: 'sidebar',
    props: ['items'],
    data: function () {
        return {
            menuIsVisible: false
        }
    },
    methods: {
        goBack () {
            this.$router.go(-1)
        }
    },
    computed: {
    },
    mounted () {
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/app.scss';

    .sidebar-items {
        margin-bottom: 40px;
        overflow: hidden;

        &__sidebar-item {
            display: block;
            padding: 8px 4px 8px 10px;
            border: 1px solid $grey;
            border-top: 0;
            background: $white;
            transition: all ease 0.2s;
            color: $black;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            &:hover:not(&--header) {
                background: $light-grey;
                text-decoration: none;
                color: $black;
            }

            &--header {
                border: 0;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                background: $blue;
                color: darken($white, 6%);
            }
        }
    }

</style>
