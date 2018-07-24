<template>
    <section class="main-content">
        <div class="container-fluid">
            <div class="row justify-content-center" v-if="note !== null && Object.keys(this.note).length !== 0">

                <div class="col-md-5">
                    <h1>Edit Note</h1>

                    <div v-if="note">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" v-model="note.title">
                        </div>

                        <div class="form-group">
                            <label>Content</label>
                            <textarea class="form-control" v-model="note.content"></textarea>
                        </div>
                        <button @click="saveNote" class="btn btn-primary btn-block mb-3"><i class="fa fa-save fa-fw"></i> Save</button>
                        <button @click="deleteNote" class="btn btn-danger"><i class="fa fa-trash fa-fw"></i> Delete Note</button>
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

                // Let go back to the main screen
                this.$router.push({name: 'account'})
            } catch (error) {
                this.$toasted.error('Your note couldn\'t be saved. There was an error connecting to the server.')
            }
        },
        confirmDeleteNote () {
            let result = window.confirm('Are you sure you want to delete this note?')
            if (!result) {
                return
            }
            this.deleteNote()
        },
        async deleteNote () {
            try {
                await this.$store.dispatch('note/deleteNote', this.note)
                await this.$store.dispatch('note/deleteNoteFromStack', this.note)
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
        this.$root.$on('confirmDeleteNote', () => { this.confirmDeleteNote() })
    },
    beforeDestroy () {
        this.$root.$off('confirmDeleteNote')
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/app.scss'
</style>
