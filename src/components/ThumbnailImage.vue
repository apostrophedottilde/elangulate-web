<template>
    <div class="aParent">
        <a href="#"><img class="userThumbnail card-img-top float-left" src="https://bitcrunchyltd-elangulizer-storage-images.ams3.cdn.digitaloceanspaces.com/bucket_name/files/mashyfile.jpg" alt=""></a>
    </div>
</template>

<script>
    export default {
        name: "ThumbnailImage"
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