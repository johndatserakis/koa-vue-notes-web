<template>
    <section class="main-content">
        <div class="container-fluid">
            <div class="row">

                <div class="col-md-3">
                    <sidebar v-bind:items="[
                        {name: 'Back', type: 'back', icon: 'fa fa-long-arrow-left fa-fw'},
                        {name: 'Delete Note', functionName: 'confirmDeleteNote', type: 'function', icon: 'fa fa-trash fa-fw'},
                    ]"></sidebar>
                </div>

                <div class="col-md-9">
                    <h1>Edit</h1>

                    <p>Here's the note you selected.</p>
                    <p v-if="user">{{note}}</p>

                    <hr>

                    <div v-if="loading"><i class="fa fa-circle-o-notch fa-spin"></i></div>

                    <div v-if="note">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" v-model="note.title">
                        </div>

                        <div class="form-group">
                            <label>Content</label>
                            <textarea class="form-control" v-model="note.content"></textarea>
                        </div>
                        <button v-on:click="saveNote()" class="btn btn-primary"><i class="fa fa-save fa-fw"></i> Save</button>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { checkRefreshTokensAndResend} from '@/common/utilities'

    export default {
        name: 'editNote',
        data () {
            return {
                loading: false,
                note: null
            }
        },
        methods: {
            loadNote() {
                this.loading = true
                this.$store.dispatch('note/getNote', this.$route.query.id)
                .then((response) => {
                    this.loading = false
                    this.note = response
                }).catch((error) => {
                    checkRefreshTokensAndResend(error).then((response) => { if (response) { this.loadNote() } })
                })
            },
            saveNote() {
                this.$store.dispatch('note/saveNote', this.note)
                .then((response) => {
                    this.$toasted.success('Saved.')

                    //Now that we've updated the note, let's update it in the notes array
                    if (this.notes.length) {
                        let i = this.notes.map(note => note.id).indexOf(this.note.id)
                        this.$set(this.notes, i, this.note)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    checkRefreshTokensAndResend(error).then((response) => { if (response) { this.saveNote() } })
                })
            },
            confirmDeleteNote() {
                this.$modal.show('dialog', {
                    title: 'Delete ' + this.note.title,
                    text: 'Are you sure you want to delete this note?',
                    buttons: [
                        { title: 'Close' },
                        { title: 'Delete', handler: () => { this.deleteNote() }},
                    ]
                })
            },
            deleteNote() {
                this.$store.dispatch('note/deleteNote', this.note)
                .then((response) => {
                    this.$modal.hide('dialog')
                    this.$toasted.success('Deleted.')

                    if (this.notes.length) {
                        let i = this.notes.map(note => note.id).indexOf(this.note.id)
                        this.$delete(this.notes, i)
                    }

                    this.$router.go(-1)
                })
                .catch((error) => {
                    this.$toasted.error('There was an error connecting to the server.')
                })
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                notes: state => state.note.notes,
            })
        },
        created () {
            this.loadNote()
        },
        mounted () {
            this.$router.app.$on('confirmDeleteNote', () => { this.confirmDeleteNote(); })
        },
        beforeDestroy () {
            this.$router.app.$off('confirmDeleteNote')
        },

    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/app.scss'
</style>
