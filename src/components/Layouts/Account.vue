<template>
    <section class="main-content">
        <div class="container">

            <h1>Account</h1>

            <p>If you see this you should be logged in. Your notes are shown below.</p>
            <p v-if="user">{{user}}</p>

            <div v-if="loading"><i class="fa fa-circle-o-notch fa-spin"></i></div>

            <div class="list-group">
                <div v-for="note in notes" class="list-group-item">
                    <strong>{{note.title}}</strong>
                    <p>{{note.content}}</p>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name: 'account',
        data () {
            return {
                loading: false,
                notes: ''
            }
        },
        methods: {
            loadNotes() {
                this.loading = true
                this.$store.dispatch('getUsersNotes').then((response) => {
                    this.notes = response.notes
                    this.loading = false
                }).catch(() => {})
            }
        },
        computed: {
            ...mapState(['user'])
        },
        mounted () {
            // this.loadNotes()
        },
    }
</script>

<style lang="scss" scoped>
</style>
