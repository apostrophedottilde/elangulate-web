<template>
    <div class="card correction-suggestions">
        <h5>Suggest corrections</h5>
        <div class="" v-for="(sentence, index) in sentences" v-bind:key="sentence.id + '3'">
            <div class="card">
                <div class="card-text">{{sentence.foreignText}}</div>
                <div class="card-text greyed">{{sentence.nativeText}}</div>
                <input type="text" v-model="currentCorrections[index]" class="form-control" value="Sentence correction"/>
            </div>
        </div>
        <input type="button" class="btn btn-outline-dark" @click="submitCorrectionSet(currentCorrections, sentences)" value="Suggest corrections"/>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "SuggestedCorrections",
        data: function () {
            return {
                currentCorrections: []
            }
        },
        props: {
            journalEntryId: Number,
            sentences: []
        },
        created: function() {
            this.currentCorrections = new Array(this.sentences.length);
        },
        methods: {
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