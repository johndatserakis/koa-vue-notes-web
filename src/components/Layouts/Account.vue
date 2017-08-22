<template>
    <section class="main-content">
        <div class="container-fluid">
            <div class="row">

                <!-- Sidebar -->
                <div class="col-md-3">
                    <sidebar v-bind:items="[
                        {name: 'Create Note', to: 'createNote', type: 'link', icon: 'fa fa-plus fa-fw'},
                    ]"></sidebar>
                </div>

                <!-- This is where the main content goes when using the sidebar. -->
                <div class="col-md-9">
                    <div v-if="loading"><i class="fa fa-circle-o-notch fa-spin"></i></div>

                    <div class="note-block">
                        <div v-for="note in notes" class="row">
                            <div class="col-12">
                                <div class="note-block__note" v-on:click="editNote(note)">
                                    <p class="lead"><strong>{{note.title}}</strong></p>
                                    <p>{{note.content}} <span class="pull-right"><i class="fa fa-long-arrow-right"></i></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button v-if="okToLoadMore" v-on:click="loadNotes()" class="btn btn-primary"><i class="fa fa-chevron-down fa-fw"></i>
                        Load More
                    </button>

                </div>

            </div>
        </div>
    </section>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { setAuthorizationHeader, checkRefreshTokensAndResend} from '@/common/utilities'

    export default {
        name: 'account',
        data() {
            return {
                loading: false,
                okToLoadMore: true,
                query: {
                    sort: '',
                    order: 'desc',
                    page: 0,
                    limit: 20,
                }
            }
        },
        methods: {
            loadNotes() {
                this.loading = true
                this.$store.dispatch('note/getUsersNotes', this.query)
                .then((response) => {
                    this.loading = false
                    if (response.length === this.query.limit) {
                        this.okToLoadMore = true
                        this.query.page = this.query.page + 1
                    } else {
                        this.okToLoadMore = false
                    }
                }).catch((error) => {
                    this.$toasted.error('There was an error connecting to the server.')
                })
            },
            editNote(note) {
                let i = this.notes.map(note => note.id).indexOf(note.id)
                this.$router.push({name: 'editNote', query: {id: this.notes[i].id}})
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                notes: state => state.note.notes,
            })
        },
        created () {
            this.loadNotes()
        },
        destroyed() {
        }
    }
</script>

<style lang="scss" scoped>

    @import '~@/assets/css/app.scss';

    .note-block {
        &__note {
            background: lighten($light-grey, 2%);
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 20px;
            border: 1px solid $grey;

            &:hover {
                cursor: pointer;
                opacity: 0.8;
            }
        }
    }

</style>
