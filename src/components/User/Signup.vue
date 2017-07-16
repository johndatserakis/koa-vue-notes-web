<template>
    <section class="user-action">
        <div class="row">
            <div class="container">

                <div class="user-block">

                    <h1 class="user-block__header">Signup</h1>

                    <div class="user-block__content">
                        <form v-on:submit.prevent autocomplete="off">
                            <div
                                class="form-group"
                                v-bind:class="{ 'form-group--error': $v.credentials.first_name.$error, 'form-group--success': !$v.credentials.first_name.$invalid && $v.credentials.first_name.$dirty }" >
                                <label>First Name</label>
                                <input
                                    autofocus
                                    autocomplete=""
                                    type="text"
                                    class="form-control"
                                    name="signup-form-first_name"
                                    aria-describedby="First Name"
                                    v-model.trim="credentials.first_name"
                                    @input="$v.credentials.first_name.$touch()"
                                >
                                <div class="form-group__message" v-if="$v.credentials.first_name.$error">Please enter your first name.</div>
                            </div>

                            <div
                                class="form-group"
                                v-bind:class="{ 'form-group--error': $v.credentials.last_name.$error, 'form-group--success': !$v.credentials.last_name.$invalid && $v.credentials.last_name.$dirty }" >
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="signup-form-last_name"
                                    aria-describedby="Last Name"
                                    v-model.trim="credentials.last_name"
                                    @input="$v.credentials.last_name.$touch()"
                                >
                                <div class="form-group__message" v-if="$v.credentials.last_name.$error">Please enter your last name.</div>
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
                                v-bind:class="{ 'form-group--error': $v.credentials.password_confirm.$error, 'form-group--success': !$v.credentials.password_confirm.$invalid && $v.credentials.password_confirm.$dirty }" >
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name="signup-form-password_confirm"
                                    aria-describedby="Confirm Password"
                                    v-model.trim="credentials.password_confirm"
                                    @input="$v.credentials.password_confirm.$touch()"
                                >
                                <div class="form-group__message" v-if="$v.credentials.password_confirm.$error">Entry doesn't match.</div>
                            </div>

                            <button
                                class="btn btn-green btn-lg mt-4 btn-block"
                                @click="submit()"
                            >
                            <span v-if="pending"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>
                            <span v-else>Signup</span>
                            </button>

                            <div class="mt-4 small">
                                <p>Already have an account? <router-link to="/user/login">Login here.</router-link></p>
                                <p><router-link to="/user/forgot">Forgot your password?</router-link></p>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    </section>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { required, minLength, between, sameAs, email } from 'vuelidate/lib/validators'

    export default {
        name: 'signup',
        data () {
            return {
                credentials: {
                    first_name: '',
                    last_name: '',
                    username: '',
                    email: '',
                    password: '',
                    password_confirm: '',
                },
                pending: false,
            }
        },
        methods: {
            submit () {
                if (this.$v.$invalid) { this.$v.$touch(); return }

                this.pending = true

                const credentials = {
                    first_name: this.credentials.first_name,
                    last_name: this.credentials.last_name,
                    username: this.credentials.username,
                    email: this.credentials.email,
                    password: this.credentials.password,
                    password_confirm: this.credentials.password_confirm,
                }

                this.$store.dispatch('userSignup', credentials)
                .then(() => {
                    this.credentials.first_name = ''
                    this.credentials.last_name = ''
                    this.credentials.username = ''
                    this.credentials.email = ''
                    this.credentials.password = ''
                    this.credentials.password_confirm = ''
                    this.$v.$reset()
                    this.$router.push('/user/login')
                })
                .catch(() => {
                })
                .then(() => {
                    this.pending = false
                })
            }
        },
        computed: {
            ...mapState(['user'])
        },
        validations: {
            credentials: {
                first_name: {
                  required
                },
                last_name: {
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
                password_confirm: {
                  sameAs: sameAs('password'),
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>