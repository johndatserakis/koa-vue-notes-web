<template>
    <section class="main-content">
        <div class="container-fluid">

            <div class="row justify-content-center">

                <div class="col-md-5">
                    <h1>Create Note</h1>

                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" v-model="note.title">
                    </div>

                    <div class="form-group">
                        <label>Content</label>
                        <textarea class="form-control" v-model="note.content"></textarea>
                    </div>
                    <button id="create-note-button" @click="createNote" class="btn btn-primary btn-block"><i class="fa fa-save fa-fw"></i> Save</button>
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
            note: {
                title: '',
                content: ''
            }
        }
    },
    methods: {
        async createNote () {
            if (!this.note.title || !this.note.content) {
                this.$toasted.error('Title and Content need to be filled out.')
                return
            }

            try {
                const responseCreate = await this.$store.dispatch('note/createNote', this.note)
                let insertId = responseCreate.data.id
                const responseResult = await this.$store.dispatch('note/getNote', insertId)
                await this.$store.dispatch('note/addNoteToStack', responseResult)
                this.$router.push({name: 'account'})
                this.$toasted.success('Note created.')
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
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/app.scss';
</style>
