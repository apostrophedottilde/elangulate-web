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
    import Correction from "./Correction";
    export default {
        name: "correction-set",
        components: {Correction},
        data: function () {
            return {
                creatorAvatar: {}
            }
        },
        props: {
            correctionSet: [],
            originalSentences: {},
        },
        beforeCreate: function()  {
            console.log("about to create correction set")
        },
        created: function()  {
            console.log("created correction set")
        },
        methods: {
            findSpecificSentence: function (sentenceId) {
                const specificSentence = this.originalSentences.find(s => s.id === sentenceId);
                if (specificSentence) {
                    return specificSentence.foreignText;
                }
                return 'NOT FOUND'
            },
        },
    }
</script>

<style scoped>
    .avatar {
        clear: initial;
        margin-bottom: 2em;
    }

    .correction-set {
        margin-left: 1em;
        margin-right: 1em;
        margin-top: 2em;
    }

    .aParent div {
        float: left;
        clear: none;
    }

    .bParent div {
        clear: none;
    }
</style>