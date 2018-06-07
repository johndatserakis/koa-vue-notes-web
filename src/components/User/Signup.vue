<template>
    <section class="user-action">
        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <div class="user-block">

                        <h1 class="user-block__header">Signup</h1>

                        <div class="user-block__content">
                            <form v-on:submit.prevent autocomplete="off">
                                <div
                                    class="form-group"
                                    v-bind:class="{ 'form-group--error': $v.credentials.firstName.$error, 'form-group--success': !$v.credentials.firstName.$invalid && $v.credentials.firstName.$dirty }" >
                                    <label>First Name</label>
                                    <input
                                        autofocus
                                        autocomplete=""
                                        type="text"
                                        class="form-control"
                                        name="signup-form-firstName"
                                        aria-describedby="First Name"
                                        v-model.trim="credentials.firstName"
                                        @input="$v.credentials.firstName.$touch()"
                                    >
                                    <div class="form-group__message" v-if="$v.credentials.firstName.$error">Please enter your first name.</div>
                                </div>

                                <div
                                    class="form-group"
                                    v-bind:class="{ 'form-group--error': $v.credentials.lastName.$error, 'form-group--success': !$v.credentials.lastName.$invalid && $v.credentials.lastName.$dirty }" >
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="signup-form-lastName"
                                        aria-describedby="Last Name"
                                        v-model.trim="credentials.lastName"
                                        @input="$v.credentials.lastName.$touch()"
                                    >
                                    <div class="form-group__message" v-if="$v.credentials.lastName.$error">Please enter your last name.</div>
                                </div>

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
                                    <div class="form-group__message" v-if="!$v.credentials.username.$minLength && $v.credentials.username.$error">Username must be at least 3 characters.</div>
                                    <div class="form-group__message" v-if="$v.credentials.username.$error">Please enter your username.</div>
                                </div>

                                <div
                                    class="form-group"
                                    v-bind:class="{ 'form-group--error': $v.credentials.email.$error, 'form-group--success': !$v.credentials.email.$invalid && $v.credentials.email.$dirty }" >
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="signup-form-email"
                                        aria-describedby="Email"
                                        v-model.trim="credentials.email"
                                        @input="$v.credentials.email.$touch()"
                                    >
                                    <div class="form-group__message" v-if="$v.credentials.email.$error">Please enter a valid email address.</div>
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
                                    <div class="form-group__message" v-if="!$v.credentials.password.$minLength && $v.credentials.password.$error">Passwords must be at least 8 characters.</div>
                                    <div class="form-group__message" v-if="$v.credentials.password.$error">Please enter a valid password.</div>
                                </div>

                                <div
                                    class="form-group"
                                    v-bind:class="{ 'form-group--error': $v.credentials.passwordConfirm.$error, 'form-group--success': !$v.credentials.passwordConfirm.$invalid && $v.credentials.passwordConfirm.$dirty }" >
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="signup-form-passwordConfirm"
                                        aria-describedby="Confirm Password"
                                        v-model.trim="credentials.passwordConfirm"
                                        @input="$v.credentials.passwordConfirm.$touch()"
                                    >
                                    <div class="form-group__message" v-if="$v.credentials.passwordConfirm.$error">Entry doesn't match.</div>
                                </div>

                                <button
                                    id="signup-submit-button"
                                    class="btn btn-green btn-lg mt-4 btn-block"
                                    @click="submit()"
                                >
                                <span v-if="pending"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>
                                <span v-else>Signup</span>
                                </button>

                                <div class="mt-4 small">
                                    <p>Already have an account? <router-link :to="{name: 'login'}">Login here.</router-link></p>
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
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
    name: 'signup',
    data () {
        return {
            credentials: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                passwordConfirm: ''
            },
            pending: false
        }
    },
    methods: {
        async submit () {
            if (this.$v.$invalid) { this.$v.$touch(); return }

            this.pending = true

            const { firstName, lastName, username, email, password, passwordConfirm } = this.credentials
            const credentials = {
                firstName,
                lastName,
                username,
                email,
                password,
                passwordConfirm
            }

            try {
                await this.$store.dispatch('user/userSignup', credentials)
                this.$toasted.success('Successfully signed up. Please login.')
                this.credentials.firstName = ''
                this.credentials.lastName = ''
                this.credentials.username = ''
                this.credentials.email = ''
                this.credentials.password = ''
                this.credentials.passwordConfirm = ''
                this.$v.$reset()
                this.$router.push({name: 'login'})
            } catch (error) {
                this.$toasted.error('Hmm, something you entered doesn\'t seem right.')
            } finally {
                this.pending = false
            }
        }
    },
    validations: {
        credentials: {
            firstName: {
                required
            },
            lastName: {
                required
            },
            username: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            },
            passwordConfirm: {
                sameAs: sameAs('password')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
