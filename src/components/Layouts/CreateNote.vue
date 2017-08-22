<template>
    <section class="main-content">
        <div class="container-fluid">

            <div class="row">

                <div class="col-md-3">
                    <sidebar v-bind:items="[
                        {name: 'Back', type: 'back', icon: 'fa fa-long-arrow-left fa-fw'},
                    ]"></sidebar>
                </div>

                <div class="col-md-9">
                    <h1>Create Note</h1>

                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" v-model="note.title">
                    </div>

                    <div class="form-group">
                        <label>Content</label>
                        <textarea class="form-control" v-model="note.content"></textarea>
                    </div>
                    <button v-on:click="createNote()" class="btn btn-primary mb-3"><i class="fa fa-plus fa-fw"></i> Create</button>
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
                note: {
                    title: '',
                    content: '',
                }
            }
        },
        methods: {
            createNote() {
                this.$store.dispatch('note/createNote', this.note)
                .then((response) => {
                    this.$toasted.success('Note created.')

                    let insertId = response.data.id
                    this.$store.dispatch('note/getNote', insertId)
                    .then((response) => {
                        this.notes.unshift(response)
                        this.$router.push({name: 'account'})
                    })
                    .catch((error) => {
                    })
                })
                .catch((error) => {
                    checkRefreshTokensAndResend(error).then((response) => { if (response) { this.createNote() } })
                })
            },
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                notes: state => state.note.notes,
            })
        },
        created () {
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/app.scss';
</style>
