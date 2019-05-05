<template>
    <div class="aParent">
        <a href="#"><img class="userThumbnail card-img-top float-left" v-bind:src="url" alt=""></a>
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