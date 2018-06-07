<template>
    <section class="user-action">
        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <div class="user-block">

                        <h1 class="user-block__header">Reset Password</h1>

                        <div class="user-block__content">
                            <form v-on:submit.prevent autocomplete="off">
                                <div
                                    class="form-group"
                                    v-bind:class="{ 'form-group--error': $v.credentials.password.$error, 'form-group--success': !$v.credentials.password.$invalid && $v.credentials.password.$dirty }" >
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="reset-form-password"
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
                                        name="reset-form-passwordConfirm"
                                        aria-describedby="Confirm Password"
                                        v-model.trim="credentials.passwordConfirm"
                                        @input="$v.credentials.passwordConfirm.$touch()"
                                    >
                                    <div class="form-group__message" v-if="$v.credentials.passwordConfirm.$error">Entry doesn't match.</div>
                                </div>

                                <button
                                    id="reset-submit-button"
                                    class="btn btn-green btn-lg mt-4 btn-block"
                                    @click="submit()"
                                >
                                <span v-if="pending"><i class="fa fa-circle-o-notch fa-spin fa-fw"></i></span>
                                <span v-else><i class="fa fa-refresh"></i> Reset</span>
                                </button>

                                <div class="mt-4 small">
                                    <p>Not signed up yet? <router-link to="/user/signup">Signup here.</router-link></p>
                                    <p><router-link to="/user/login">Login</router-link></p>
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'reset',
    data () {
        return {
            credentials: {
                password: '',
                passwordConfirm: '',
                passwordResetToken: '',
                email: ''
            },
            pending: false
        }
    },
    methods: {
        async submit () {
            if (this.$v.$invalid) { this.$v.$touch(); return }

            this.pending = true

            const { password, passwordResetToken, email } = this.credentials
            const credentials = {
                password,
                passwordResetToken,
                email
            }

            try {
                await this.$store.dispatch('user/userReset', credentials)
                this.$toasted.success('Successfully reset password. Please login.')
                this.credentials.password = ''
                this.credentials.passwordConfirm = ''
                this.$v.$reset()
                this.$router.push({name: 'login'})
            } catch (error) {
                this.$toasted.error('Your reset link has expired or is incorrect. Please reset your password again.')
            } finally {
                this.pending = false
            }
        }
    },
    validations: {
        credentials: {
            password: {
                required,
                minLength: minLength(8)
            },
            passwordConfirm: {
                sameAs: sameAs('password')
            }
        }
    },
    mounted () {
        this.credentials.passwordResetToken = this.$route.query.passwordResetToken
        this.credentials.email = this.$route.query.email
    }
}
</script>

<style lang="scss" scoped>
</style>
