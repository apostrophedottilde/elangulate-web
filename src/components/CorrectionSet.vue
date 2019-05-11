<template>
    <div class="correction-set">
        <div class="avatar">
            <div class="">

            </div>
            <div class="">
                Corrector: Yamrmi Bobski
            </div>
        </div>

        <div class="" v-for="correction in corrections" v-bind:key="correction.id">
            {{correction.title}}
            <correction v-bind:correction="correction" v-bind:originalText="findSpecificSentence(correction.sentenceId)"></correction>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
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
            corrections: {
                id: Number,
                creator: Number,
                journalEntryId: Number,
                corrections: [{
                    id: Number,
                    creator: Number,
                    sentenceId: Number,
                    correctionSteps: [{
                        action: String,
                        text: String,
                    }]

                }]
            },
            sentences: [{
                id: Number,
                creator: String,
                foreignText: String,
                nativeText: String,
                foreignLanguage: String,
                nativeLanguage: String,
            }],
        },
        computed: {
            findSpecificSentence: function(sentenceId) {
                const specificSentence = this.sentences.find(s => s.id === sentenceId);
                if(specificSentence) {
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