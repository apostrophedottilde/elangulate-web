<template>
    <div class="aParent">
        <a href="#"><img class="userThumbnail card-img-top float-left" v-bind:src="fullUrl" alt=""></a>
    </div>
</template>

<script>
    export default {
        name: "thumbnail-image",
        props: {
            url: ''

        },
        created: function() {
            console.log("AVATAR IMAGE URL " + this.url.profileImageUrl)
        },
        computed: {
            fullUrl: function() {
                const base = process.env.VUE_APP_API_ROOT_URL;
                const full = `${base}/images/${this.url}`;
                console.log('|FULL URL' + full);
                return full
            }
        }
    }
</script>

<style scoped>
    .aParent div {
        float: left;
        clear: none;
    }

    .userThumbnail {
        margin: 4px;
        width: 48px;
        max-height: 48px;
    }
</style>