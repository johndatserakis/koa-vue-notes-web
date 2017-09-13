<template>
    <section class="main-content">
        <div class="container-fluid">
            <div class="row" v-if="note !== null && Object.keys(this.note).length !== 0">
                <div class="col-md-3">
                    <sidebar v-bind:items="[
                        {name: 'Back', type: 'back', icon: 'fa fa-long-arrow-left fa-fw'},
                        {name: 'Delete Note', functionName: 'confirmDeleteNote', type: 'function', icon: 'fa fa-trash fa-fw'},
                    ]"></sidebar>
                </div>

                <div class="col-md-9">

                    <h3 v-if="user">{{note.title}}</h3>
                    <p v-if="user">{{note.content}}</p>

                    <hr class="mt-4 mb-4">

                    <h1>Edit</h1>

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

            <div class="row" v-if="note !== null && Object.keys(this.note).length === 0">
                <div class="col-md-12">
                    <p><i class="fa fa-frown-o fa-fw"></i> Hmm, that note couldn't be found.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'editNote',
        data () {
            return {
                note: null
            }
        },
        methods: {
            async loadNote () {
                try {
                    const response = await this.$store.dispatch('note/getNote', this.$route.query.id)
                    this.note = response
                } catch (error) {
                    this.$toasted.error('There was an error connecting to the server.')
                }
            },
            async saveNote () {
                try {
                    await this.$store.dispatch('note/saveNote', this.note)
                    this.$toasted.success('Saved.')

                    // Now that we've updated the note, let's update it in the notes array
                    await this.$store.dispatch('note/editNoteInStack', this.note)
                } catch (error) {
                    this.$toasted.error('Your note couldn\'t be saved. There was an error connecting to the server.')
                }
            },
            confirmDeleteNote () {
                this.$modal.show('dialog', {
                    title: 'Delete ' + this.note.title,
                    text: 'Are you sure you want to delete this note?',
                    buttons: [
                        { title: 'Close' },
                        { title: 'Delete', handler: () => { this.deleteNote() } }
                    ]
                })
            },
            async deleteNote () {
                try {
                    await this.$store.dispatch('note/deleteNote', this.note)
                    await this.$store.dispatch('note/deleteNoteFromStack', this.note)
                    this.$modal.hide('dialog')
                    this.$toasted.success('Deleted.')
                    this.$router.push({name: 'account'})
                } catch (error) {
                    this.$toasted.error('There was an error connecting to the server.')
                }
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                notes: state => state.note.notes
            })
        },
        created () {
            this.loadNote()
        },
        mounted () {
            this.$router.app.$on('confirmDeleteNote', () => { this.confirmDeleteNote() })
        },
        beforeDestroy () {
            this.$router.app.$off('confirmDeleteNote')
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/app.scss'
</style>
