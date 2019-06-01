<template>
    <div class="card correction-sets-container">
        <div class="card correction-suggestions">
            <h5>Suggest corrections</h5>
            <div class="" v-for="(sentence, index) in originalSentences" v-bind:key="sentence.id + '3'">
                <div class="card" v-on:added-suggested-corrections-set="addCorrectionSet">
                    <div class="card-text">{{sentence.foreignText}}</div>
                    <div class="card-text greyed">{{sentence.nativeText}}</div>
                    <input type="text" v-model="currentCorrections[index]" class="form-control" value="Sentence correction"/>
                </div>
            </div>
            <input type="button" class="btn btn-outline-dark" @click="submitCorrectionSet(currentCorrections, originalSentences)" value="Suggest corrections"/>
        </div>

        Correction sets
        <div class="card correction-sets-list" v-for="set in liveCorrectionSets" v-bind:key="set.id">
            <correction-set v-bind:correctionSet="set" v-bind:originalSentences="originalSentences"></correction-set>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import CorrectionSet from "./CorrectionSet";
    export default {
        name: "correction-sets",
        components: {CorrectionSet},
        data: function() {
            return {
                currentCorrections: [],
                liveCorrectionSets: []
            }
        },
        props: {
            journalEntryId: Number,
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
            submitCorrectionSet: function(corrections, entrySentences) {
                const jwt = this.$cookie.get('jwt');
                const newCorrections = [];

                entrySentences.forEach((e, index)=> {
                    const text = !corrections[index] ? null : corrections[index];
                    newCorrections.push({
                        sentenceId: e.id,
                        correctionText: text
                    });
                });

                const postData = {
                    journalEntryId: this.journalEntryId,
                    corrections: newCorrections
                };
                const base = process.env.VUE_APP_API_ROOT_URL;

                axios.post(`${base}/correction-sets`, postData, {headers: {'Authorization': jwt}})
                    .then(result => {
                        this.liveCorrectionSets.push(result.data)
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
            addCorrectionSet: function() {
                console.log('Added a correction set and received event in correction sets')
                alert('Added a correction set and received event in correction sets')

            }
        }
    }
</script>

<style scoped>
    .correction-sets-list {
        margin-left: 1em;
        margin-right: 1em;
        margin-top: .8em;
        background: #fff4f4;
    }

    .correction-suggestions {
        background: #9dc0db;
    }

    .greyed {
        color: #9c9c9c;
        font-style: italic;
    }

    .aParent div {
        float: left;
        clear: none;
    }

    .bParent div {
        clear: none;
    }
</style>