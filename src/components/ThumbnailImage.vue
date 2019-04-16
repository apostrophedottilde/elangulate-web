<template>
    <div class="aParent">
        <a href="#"><img class="userThumbnail card-img-top float-left" v-bind:src="randomImage()" alt=""></a>
    </div>
</template>

<script>
    export default {
        name: "ThumbnailImage",
        methods: {
            randomImage() {
                const randnum = Math.floor(Math.random() * Math.floor(2));
                return randnum == 0 ? "/girl1.jpg" : "/girl2.jpg"
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