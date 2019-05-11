<template>
    <div>
        <div class="card correction-sets-list" v-for="correctionSet in liveCorrectionSets" v-bind:key="correctionSet.id">
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
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Correction from "./Correction";
    export default {
        name: "correction-sets",
        components: {Correction},
        props: {
            journalEntryId: Number,
            liveCorrectionSets: [],
            originalSentences: {}
        },
        created: function() {
            this.fetchCorrectionSets();
        },
        methods: {
            fetchCorrectionSets: function () {
                const jwt = this.$cookie.get('jwt');
                const base = process.env.VUE_APP_API_ROOT_URL;

                axios.get(`${base}/correction-sets?journalEntryId=${this.journalEntryId}&page=0&size=20`, {headers: {'Authorization': jwt}})
                    .then(result => {
                        this.liveCorrectionSets = result.data;
                    }, error => {
                        console.error(error)
                    })
            },
            findSpecificSentence: function (sentenceId) {
                const specificSentence = this.originalSentences.find(s => s.id === sentenceId);
                if (specificSentence) {
                    return specificSentence.foreignText;
                }
                return 'NOT FOUND'
            },
        }
    }
</script>

<style scoped>
    .avatar {
        clear: initial;
        margin-bottom: 2em;
    }

    .correction-sets-list {
        margin-left: 1em;
        margin-right: 1em;
        margin-top: .8em;
        background: #fff4f4;
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