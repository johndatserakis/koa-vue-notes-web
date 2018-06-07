<template>
    <section class="user-action">
        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <div class="user-block">

                        <h1 class="user-block__header">Login</h1>

                        <div class="user-block__content">
                            <form v-on:submit.prevent autocomplete="off">
                                <div
                                    class="form-group"
                                    v-bind:class="{ 'form-group--error': $v.credentials.username.$error, 'form-group--success': !$v.credentials.username.$invalid && $v.credentials.username.$dirty }" >
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="signup-form-username"
                                        aria-describedby="Username"
                                        v-model.trim="credentials.username"
                                        @input="$v.credentials.username.$touch()"
                                    >
                                    <div class="form-group__message" v-if="$v.credentials.username.$error">Please enter your username.</div>
                                </div>

                                <div
                                    class="form-group"
                                    v-bind:class="{ 'form-group--error': $v.credentials.password.$error, 'form-group--success': !$v.credentials.password.$invalid && $v.credentials.password.$dirty }" >
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="signup-form-password"
                                        aria-describedby="Password"
                                        v-model.trim="credentials.password"
                                        @input="$v.credentials.password.$touch()"
                                    >
                                    <div class="form-group__message" v-if="$v.credentials.password.$error">Please enter your password.</div>
                                </div>

                                <button
                                    id="login-submit-button"
                                    class="btn btn-green btn-lg mt-4 btn-block"
                                    @click="submit()"
                                >
                                    <span v-if="pending"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>
                                    <span v-else>Login <i class="fa fa-long-arrow-right"></i></span>
                                </button>

                                <div class="mt-4 small">
                                    <p>Not signed up yet? <router-link :to="{name: 'signup'}">Signup here.</router-link></p>
                                    <p><router-link :to="{name: 'forgot'}">Forgot your password?</router-link></p>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'login',
    data () {
        return {
            credentials: {
                username: '',
                password: ''
            },
            pending: false
        }
    },
    methods: {
        async submit () {
            if (this.$v.$invalid) { this.$v.$touch(); return }

            this.pending = true

            const credentials = {
                username: this.credentials.username,
                password: this.credentials.password
            }

            try {
                await this.$store.dispatch('user/userLogin', credentials)
                this.credentials.username = ''
                this.credentials.password = ''
                this.$v.$reset()
                this.$router.push({name: 'account'})
            } catch (error) {
                this.$toasted.error('Hmm, those details don\'t seem right.')
            } finally {
                this.pending = false
            }
        }
    },
    validations: {
        credentials: {
            username: {
                required
            },
            password: {
                required
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
