<template>
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
</template>

<script>
    import axios from 'axios'

    export default {
        name: "new-correction-set-suggestion",
        data: function () {
            return {
                currentCorrections: []
            }
        },
        props: {
            journalEntryId: Number,
            originalSentences: Array
        },
        created: function() {
            this.currentCorrections = new Array(this.sentences.length);
        },
        computed: {

        },
        methods: {
            addCorrectionSet: function() {
                console.log('Added a correction set and received event in JournalEntryPage.vue')
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
                        this.currentCorrections.push(result.data)
                    }, error => {
                        console.error(error)
                    })
            }
        },
    }
</script>

<style scoped>

</style>