<template>
    <div class="correction-set">
        <div class="avatar">
            <div class="">
                <thumbnail-image></thumbnail-image>
            </div>
            <div class="">
                Corrector: Yamrmi Bobski
            </div>
        </div>

        <div class="" v-for="correction in correctionSet.corrections" v-bind:key="correction.id">
            {{correction.title}}
            <correction v-bind:correction="correction" v-bind:originalText="findSpecificSentence(correction.sentenceId)"></correction>
        </div>
    </div>
</template>

<script>
    export default {
        name: "correction-set"
    }
</script>

<style scoped>

</style>