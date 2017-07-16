<template>

    <div>
        Logout
    </div>

</template>

<script>
    import { required, minLength, between, sameAs, email } from 'vuelidate/lib/validators'

    export default {
        name: 'logout',
        methods: {
        },
        mounted () {
            this.$store.dispatch('logout')
            .then( () => {
                this.$router.push('/')
            })
            .catch(() => {
            })
        }
    }
</script>

<style lang="scss" scoped>
</style>