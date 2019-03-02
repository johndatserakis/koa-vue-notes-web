<template>
    <section class="footer-main">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <p><a href="https://github.com/johndatserakis">Koa-Vue-Notes</a> is a SPA using Koa (2.3) as the <a href="https://github.com/johndatserakis/koa-vue-notes-api">backend</a> and Vue (2.6.8) as the <a href="https://github.com/johndatserakis/koa-vue-notes-api">frontend</a>.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'footer-main',
    data () {
        return {}
    },
    methods: {
    },
    computed: {
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/app.scss';

    //This is just a blank div that sits about footer-main. This is needed
    //because footer-main is absolutely positioned.
    .sticky-footer-spacing {
        height: 40px;
    }

    .footer-main {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100px;
        background-color: $light-grey;
        padding: 30px 0;
        text-align: center;
        color: lighten($black, 25%);

        a {
            color: lighten($black, 5%);
            text-decoration: underline;

            &:hover {
                color: lighten($black, 25%);
            }
        }

        &__left {
            margin-bottom: 15px;
        }

        &__middle {
            &__image {
                max-height: 60px;
                margin-bottom: 15px;
            }
        }

        @include media-breakpoint-up(md) {
        }
    }

</style>
