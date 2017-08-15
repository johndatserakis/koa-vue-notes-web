<template>
    <section class="main-content">
        <div class="container">

            <div class="row">
                <div class="col-md-12">

                    <button v-on:click="goBack()" class="btn btn-primary btn-sm mb-3">
                        <i class="fa fa-arrow-left fa-fw"></i> Back
                    </button>

                    <h1>Edit</h1>

                    <p>Here's the note you selected.</p>
                    <p v-if="user">{{note}}</p>

                    <hr>

                    <div v-if="loading"><i class="fa fa-circle-o-notch fa-spin"></i></div>

                </div>
            </div>

            <div v-if="note" class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" v-model="note.title">
                    </div>

                    <div class="form-group">
                        <label>Content</label>
                        <textarea class="form-control" v-model="note.content"></textarea>
                    </div>
                    <button v-on:click="saveNote()" class="btn btn-primary mb-3">Save</button>
                    <br>
                    <button v-on:click="deleteNote()" class="btn btn-danger">Delete</button>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { setAuthorizationHeader, checkRefreshTokensAndResend} from '@/common/utilities'

    export default {
        name: 'editNote',
        data () {
            return {
                loading: false,
                note: null
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
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
            deleteNote() {
                this.$store.dispatch('note/deleteNote', this.note)
                .then((response) => {
                    this.$toasted.success('Deleted.')

                    if (this.notes.length) {
                        let i = this.notes.map(note => note.id).indexOf(this.note.id)
                        this.$delete(this.notes, i)
                    }

                    this.$router.go(-1)
                })
                .catch((error) => {
                    checkRefreshTokensAndResend(error).then((response) => { if (response) { this.saveNote() } })
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
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/app.scss';
</style>
